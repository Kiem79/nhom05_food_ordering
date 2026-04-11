import data from '@/lib/data.json';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Image from "next/image";
export default function ProductsPage() {
  return (
    <div className="py-10">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-bold">Thực đơn hôm nay</h2>
          <p className="text-slate-500">Khám phá hơn 100 món ăn hấp dẫn</p>
        </div>
        <div className="flex gap-2">
          {/* Chỗ này để sau này làm Filter */}
          <Button variant="outline">Lọc theo giá</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.map((p) => (
          <div key={p.id} className="bg-white rounded-xl overflow-hidden border group hover:shadow-xl transition-all">
            <div className="relative h-48 overflow-hidden">
              <Image
  src={p.images[0]}
  alt={p.name}
  fill
  className="object-cover"
/>
            </div>
            <div className="p-4 space-y-3">
              <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-1 rounded-full">{p.category}</span>
              <h3 className="font-bold text-lg leading-tight line-clamp-1">{p.name}</h3>
              <div className="flex justify-between items-center pt-2">
                <span className="text-xl font-bold text-slate-900">{p.price.toLocaleString()}đ</span>
                <Button size="icon" className="rounded-full bg-slate-900"><Plus className="w-5 h-5" /></Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}