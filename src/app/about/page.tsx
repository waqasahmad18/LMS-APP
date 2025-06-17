export default function About() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold text-blue-800 mb-6">About LMSPro</h1>
      <img src="/2.jpg" alt="Our Team" className="w-full max-w-lg rounded-xl shadow mb-8 mx-auto" />
      <p className="text-lg text-gray-700 mb-8">
        LMSPro aik modern Learning Management System hai jo students aur teachers ko ek platform par laata hai. Humara mission hai ke learning ko asaan, accessible aur engaging banaya jaye. Yahan aap courses create, enroll aur manage kar sakte hain, apni progress track kar sakte hain aur community se connect ho sakte hain.
      </p>
      <div className="bg-white rounded-xl shadow p-8 mb-8">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">Our Mission</h2>
        <p className="text-gray-600">Har student ko behtareen learning experience dena, aur har teacher ko apna knowledge asaani se share karne ka mauka dena.</p>
      </div>
      <div className="bg-white rounded-xl shadow p-8">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">Our Team</h2>
        <ul className="space-y-2">
          <li className="text-gray-700">Waqas Ahmad – Founder & Lead Developer</li>
          <li className="text-gray-700">Aapka Naam – Co-Developer</li>
        </ul>
      </div>
    </div>
  );
} 