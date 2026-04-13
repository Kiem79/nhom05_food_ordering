import { create } from "zustand";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

interface ProductState {
  products: Product[];
}

const useProductStore = create<ProductState>(() => ({
  products: [
    // --- CƠM ---
    { id: "c1", name: "Cơm Tấm Sườn Bì Chả", price: 45000, category: "Cơm", description: "Sườn nướng mật ong, bì chả truyền thống.", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500" },
    { id: "c2", name: "Cơm Gà Hải Nam", price: 50000, category: "Cơm", description: "Thịt gà luộc mềm, cơm nấu nước dùng gà.", image: "https://images.unsplash.com/photo-1626132646529-5006375325d7?w=500" },
    { id: "c3", name: "Cơm Chiên Dương Châu", price: 40000, category: "Cơm", description: "Cơm chiên tơi, đầy đủ lạp xưởng, đậu hà lan.", image: "https://images.unsplash.com/photo-1512058560366-cd2429598260?w=500" },
    { id: "c4", name: "Cơm Bò Lúc Lắc", price: 65000, category: "Cơm", description: "Bò Úc xào thơm, kèm khoai tây chiên.", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500" },
    { id: "c5", name: "Cơm Cá Kho Tộ", price: 45000, category: "Cơm", description: "Cá lóc kho đậm đà, chuẩn vị cơm mẹ nấu.", image: "https://images.unsplash.com/photo-1567620905732-2d1ec7bb7445?w=500" },

    // --- BÚN / PHỞ ---
    { id: "b1", name: "Phở Bò Tái Lăn", price: 55000, category: "Bún/Phở", description: "Nước dùng ngọt thanh, thịt bò xào gừng.", image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=500" },
    { id: "b2", name: "Bún Bò Huế", price: 50000, category: "Bún/Phở", description: "Sợi bún to, chả bò, móng giò, nước dùng cay nồng.", image: "https://images.unsplash.com/photo-1624600356465-2342aa59d510?w=500" },
    { id: "b3", name: "Bún Thịt Nướng", price: 40000, category: "Bún/Phở", description: "Thịt nướng thơm lừng, nem nướng giòn rụm.", image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=500" },
    { id: "b4", name: "Mì Quảng Tôm Thịt", price: 45000, category: "Bún/Phở", description: "Mì vàng óng, tôm rim, trứng cút.", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500" },
    { id: "b5", name: "Hủ Tiếu Nam Vang", price: 45000, category: "Bún/Phở", description: "Đầy đủ tôm, tim, gan, trứng cút.", image: "https://images.unsplash.com/photo-1552611052-33e04de081de?w=500" },

    // --- ĂN VẶT ---
    { id: "v1", name: "Bánh Mì Hội An", price: 30000, category: "Ăn vặt", description: "Đặc sản Hội An, nước sốt độc quyền.", image: "https://images.unsplash.com/photo-1600454021970-351eff4a6554?w=500" },
    { id: "v2", name: "Gà Rán KFC", price: 35000, category: "Ăn vặt", description: "Gà giòn rụm, kèm tương cà, tương ớt.", image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=500" },
    { id: "v3", name: "Khoai Tây Chiên Lắc Phô Mai", price: 25000, category: "Ăn vặt", description: "Khoai tây giòn, lớp phô mai béo.", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500" },
    { id: "v4", name: "Gỏi Cuốn Tôm Thịt", price: 10000, category: "Ăn vặt", description: "Tôm tươi, thịt luộc, chấm mắm nêm.", image: "https://images.unsplash.com/photo-1534422298391-e4f8c170db06?w=500" },
    { id: "v5", name: "Bánh Tráng Trộn", price: 20000, category: "Ăn vặt", description: "Full topping bò khô, trứng cút, xoài xanh.", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500" },

    // --- ĐỒ UỐNG ---
    { id: "d1", name: "Trà Sữa Trân Châu", price: 35000, category: "Đồ uống", description: "Vị trà đậm đà, trân châu dai giòn.", image: "https://images.unsplash.com/photo-1544787210-2211d44b5057?w=500" },
    { id: "d2", name: "Cà Phê Muối", price: 30000, category: "Đồ uống", description: "Vị mặn nhẹ, béo ngậy của lớp kem.", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500" },
    { id: "d3", name: "Nước Ép Cam Tươi", price: 25000, category: "Đồ uống", description: "Vitamin C nguyên chất mỗi ngày.", image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500" },
    { id: "d4", name: "Trà Đào Cam Sả", price: 35000, category: "Đồ uống", description: "Thơm mùi sả, miếng đào giòn rụm.", image: "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=500" },
    { id: "d5", name: "Trà Mãng Cầu", price: 30000, category: "Đồ uống", description: "Hot trend, thanh mát, giải nhiệt.", image: "https://images.unsplash.com/photo-1556881286-fc6915169721?w=500" },
  ]
}));

export default useProductStore;