"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { ChevronRight } from "lucide-react";

interface OrderItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  displayImage: string;
  owner: string;
  note?: string;
}

interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: string;
}

export default function ReorderButton({ order }: { order: Order }) {
  const router = useRouter();
  const { addItem } = useCartStore();

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<OrderItem[]>(order.items);

  const updateQuantity = (index: number, value: number) => {
    const newItems = [...items];
    newItems[index].quantity = Math.max(1, value);
    setItems(newItems);
  };

  const handleConfirm = () => {
  items.forEach((item) => {
    addItem(
      {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.displayImage,
        note: item.note || "",
      },
      item.owner
    );

    if (item.quantity > 1) {
      for (let i = 1; i < item.quantity; i++) {
        addItem(
          {
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.displayImage,
          },
          item.owner
        );
      }
    }
  });

    setOpen(false);
    router.push("/group-order");
  };

  return (
    <>
      {/* BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="w-full sm:w-auto px-10 py-5 bg-slate-900 dark:bg-orange-500 text-white rounded-[1.8rem] text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-3"
      >
        Mua lại đơn này
        <ChevronRight size={18} />
      </button>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto space-y-6">
            <h1 className="text-x2 font-black text-center">Số lượng</h1>

            {items.map((item, index) => (
              <div key={`${item.id}-${index}`} className="flex justify-between items-center">
                <span>{item.name}</span>

                <div className="flex items-center gap-3">
  <button
    onClick={() => updateQuantity(index, item.quantity - 1)}
    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition text-lg font-bold"
  >
    -
  </button>

  <span className="text-slate-900 dark:text-white font-bold w-6 text-center">
    {item.quantity}
  </span>

  <button
    onClick={() => updateQuantity(index, item.quantity + 1)}
    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition text-lg font-bold"
  >
    +
  </button>
</div>
              </div>
            ))}

            <button
              onClick={handleConfirm}
              className="w-full py-3 bg-orange-500 text-white rounded-xl font-bold"
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      )}
    </>
  );
}