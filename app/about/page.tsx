// app/about/page.tsx
import { Mail, User, Globe } from 'lucide-react'; // Dùng Globe thay cho GitHub để tránh lỗi export

export default function AboutPage() {
  const members = [
    { name: "Lê Đức Mạnh", id: "24126129", role: "Nhóm trưởng / Fullstack", task: "Project Architecture, Zustand, Auth", github: "#" },
    { name: "Thành viên 2", id: "MSSV_02", role: "UI/UX Designer", task: "Design Figma, Code Home & About pages", github: "#" },
    { name: "Thành viên 3", id: "MSSV_03", role: "Frontend Developer", task: "Code Products (Menu) & Search pages", github: "#" },
    { name: "Thành viên 4", id: "MSSV_04", role: "Frontend Developer", task: "Code Cart & Checkout pages", github: "#" },
    { name: "Thành viên 5", id: "MSSV_05", role: "Content & QA", task: "Mock Data JSON, Testing, Documentation", github: "#" },
    { name: "Thành viên 6", id: "MSSV_06", role: "Frontend Developer", task: "Code Contact, Group Order & 404 pages", github: "#" },
  ];

  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-extrabold mb-4 text-slate-900">Đội ngũ phát triển Nhóm 05</h1>
        <p className="text-slate-600 text-lg">Sinh viên Thương mại điện tử HCMUTE</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 container mx-auto">
        {members.map((m) => (
          <div key={m.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:border-orange-500 transition-all group">
            <div className="w-16 h-16 bg-orange-100 rounded-2xl mb-6 flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
              <User className="w-8 h-8" />
            </div>
            
            <h3 className="text-xl font-bold text-slate-900">{m.name}</h3>
            <p className="text-orange-600 text-sm font-semibold mb-3">{m.role}</p>
            <p className="text-sm text-slate-700"><strong>MSSV:</strong> {m.id}</p>
            <p className="text-sm text-slate-500 mt-2 border-t pt-2">Nhiệm vụ: {m.task}</p>
            
            <div className="flex gap-4 pt-4 mt-4 border-t border-slate-100">
              <a href={m.github} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <Globe className="w-5 h-5 text-slate-400 hover:text-blue-600" />
              </a>
              <a href="#" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <Mail className="w-5 h-5 text-slate-400 hover:text-orange-600" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}