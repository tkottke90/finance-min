import { getServerSession } from "next-auth";
import { authOptions } from "../../api/v1/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  // Get the current session on the server
  const session = await getServerSession(authOptions);
  
  // Redirect to login if not authenticated
  if (!session || !session.user) {
    redirect('/login');
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Welcome!</h2>
          <p className="text-gray-600">
            You have successfully authenticated using OAuth2.
          </p>
        </div>
      </div>
    </div>
  );
}
