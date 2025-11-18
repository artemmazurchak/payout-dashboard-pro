import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PaymentMethod {
  id: string;
  name: string;
  active: boolean;
}

const initialPaymentMethods: PaymentMethod[] = [
  { id: "1", name: "Credit Card (Visa/Mastercard)", active: true },
  { id: "2", name: "PayPal", active: true },
  { id: "3", name: "Apple Pay", active: false },
  { id: "4", name: "Google Pay", active: true },
  { id: "5", name: "Bank Transfer", active: true },
  { id: "6", name: "Cryptocurrency (Bitcoin)", active: false },
  { id: "7", name: "Stripe", active: true },
  { id: "8", name: "Amazon Pay", active: false },
  { id: "9", name: "WeChat Pay", active: true },
  { id: "10", name: "Alipay", active: true },
];

const countries = [
  "Germany",
  "Spain",
  "Vietnam",
  "China",
  "United States",
  "United Kingdom",
  "France",
  "Japan",
];

interface SortableRowProps {
  method: PaymentMethod;
  index: number;
  onToggle: (id: string) => void;
}

function SortableRow({ method, index, onToggle }: SortableRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: method.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className="border-b border-border hover:bg-secondary/50 transition-colors"
    >
      <td className="py-4 px-4 w-12">
        <button
          className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
          {...attributes}
          {...listeners}
        >
          <GripVertical size={20} />
        </button>
      </td>
      <td className="py-4 px-4 text-center text-muted-foreground text-2xl">{index + 1}</td>
      <td className="py-4 px-6 text-2xl">{method.name}</td>
      <td className="py-4 px-6 text-center">
        <div className="flex justify-center">
          <Switch
            checked={method.active}
            onCheckedChange={() => onToggle(method.id)}
          />
        </div>
      </td>
    </tr>
  );
}

const PaymentMethodsTable = () => {
  const [paymentMethods, setPaymentMethods] = useState(initialPaymentMethods);
  const [selectedCountry, setSelectedCountry] = useState("Germany");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setPaymentMethods((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleToggle = (id: string) => {
    setPaymentMethods((items) =>
      items.map((item) =>
        item.id === id ? { ...item, active: !item.active } : item
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Payment Service Provider</h1>
        <div className="w-[400px]">
          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger className="h-[60px] border border-border rounded-xl bg-background font-normal text-lg px-5">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="py-3 px-4 w-12"></th>
                <th className="py-3 px-4 text-left font-bold text-base"></th>
                <th className="py-3 px-6 text-left font-bold text-base">Payment Provider</th>
                <th className="py-3 px-6 text-center font-bold text-base">Enable</th>
              </tr>
            </thead>
            <tbody>
              <SortableContext
                items={paymentMethods}
                strategy={verticalListSortingStrategy}
              >
                {paymentMethods.map((method, index) => (
                  <SortableRow
                    key={method.id}
                    method={method}
                    index={index}
                    onToggle={handleToggle}
                  />
                ))}
              </SortableContext>
            </tbody>
          </table>
        </DndContext>
      </div>

      <div className="flex justify-end mt-6">
        <button className="bg-[hsl(214,89%,52%)] hover:bg-[hsl(214,89%,48%)] text-white font-bold text-lg px-10 py-4 rounded-xl flex items-center gap-3 transition-colors shadow-lg">
          <span className="tracking-wider">SAVE</span>
          <div className="w-7 h-7 bg-white rounded flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="5" y="4" width="14" height="16" rx="1" stroke="hsl(214,89%,52%)" strokeWidth="2"/>
              <path d="M9 4V7H15V4" stroke="hsl(214,89%,52%)" strokeWidth="2"/>
              <circle cx="12" cy="14" r="2" fill="hsl(214,89%,52%)"/>
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default PaymentMethodsTable;
