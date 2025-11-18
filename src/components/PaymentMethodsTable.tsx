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
import { Checkbox } from "@/components/ui/checkbox";
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
      <td className="py-4 px-4 text-center text-muted-foreground">{index + 1}</td>
      <td className="py-4 px-6">{method.name}</td>
      <td className="py-4 px-6 text-center">
        <div className="flex justify-center">
          <Checkbox
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
        <h1 className="text-3xl font-bold">Order Settings</h1>
        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
          <SelectTrigger className="w-[200px]">
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
                <th className="py-3 px-4 text-left font-medium text-sm">ID</th>
                <th className="py-3 px-6 text-left font-medium text-sm">Name</th>
                <th className="py-3 px-6 text-center font-medium text-sm">Active</th>
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

        <div className="flex items-center justify-end gap-4 px-6 py-4 border-t border-border text-sm text-muted-foreground">
          <span>Rows per page:</span>
          <Select defaultValue="10">
            <SelectTrigger className="w-[70px] h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <span>1–{paymentMethods.length} of {paymentMethods.length}</span>
          <div className="flex gap-1">
            <button className="p-1 hover:bg-secondary rounded disabled:opacity-50" disabled>
              &lt;
            </button>
            <button className="p-1 hover:bg-secondary rounded disabled:opacity-50" disabled>
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodsTable;
