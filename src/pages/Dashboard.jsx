import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"

import Sidebar from "../components/core/Dashboard/Sidebar"

function Dashboard() {
  const { loading: profileLoading, user } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth)

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  // Dynamic role badge generator
  const getRoleBadge = (role) => {
    switch (role) {
      case "Student":
        return (
          <span className="flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-semibold tracking-wide text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
            🎓 Student
          </span>
        )
      case "Instructor":
        return (
          <span className="flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-4 py-1.5 text-sm font-semibold tracking-wide text-pink-300 shadow-[0_0_15px_rgba(236,72,153,0.1)]">
            👨‍🏫 Instructor
          </span>
        )
      case "Admin":
        return (
          <span className="flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-1.5 text-sm font-semibold tracking-wide text-yellow-300 shadow-[0_0_15px_rgba(234,179,8,0.1)]">
            🛡️ Admin
          </span>
        )
      default:
        return (
          <span className="flex items-center gap-2 rounded-full border border-richblack-500/30 bg-richblack-500/10 px-4 py-1.5 text-sm font-semibold tracking-wide text-richblack-300">
            👤 {role}
          </span>
        )
    }
  }

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)]">
      <Sidebar />
      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto bg-richblack-900">
        
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          
          {/* Enhanced Welcome Banner */}
          {user && (
            <div className="mb-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-richblack-700 bg-richblack-800 p-6 shadow-lg md:flex-row md:items-center">
              
              <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold text-richblack-5">
                  Welcome back, <span className="text-yellow-50">{user?.firstName}</span>! 👋
                </h1>
                <p className="text-sm text-richblack-300">
                  Ready to conquer the day? Here is your personalized overview.
                </p>
              </div>

              <div>
                {getRoleBadge(user?.accountType)}
              </div>
              
            </div>
          )}

          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard