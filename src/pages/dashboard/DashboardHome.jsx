import { useState } from 'react';
import { 
  Users,
  Calendar,
  Activity,
  Clock
} from 'lucide-react';
import Card from '../../components/ui/Card';

const DashboardHome = () => {
  const [stats] = useState({
    totalPatients: 1234,
    todayAppointments: 28,
    activePatients: 45,
    averageWaitTime: '15 mins'
  });

  const statCards = [
    { title: 'Total Patients', value: stats.totalPatients, icon: Users, color: 'text-blue-500' },
    { title: "Today's Appointments", value: stats.todayAppointments, icon: Calendar, color: 'text-green-500' },
    { title: 'Active Patients', value: stats.activePatients, icon: Activity, color: 'text-yellow-500' },
    // { title: 'Average Wait Time', value: stats.averageWaitTime, icon: Clock, color: 'text-purple-500' }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <Icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <Card className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
              <div>
                <p className="font-medium">New appointment scheduled</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Dr. Sarah Johnson with Patient #1234</p>
              </div>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex items-center space-x-4 py-2 border-b last:border-0">
                <div className="flex-1">
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">General Checkup</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">2:30 PM</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Today</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4">Recent Medical Records</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="font-medium">Medical Report #12345</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Patient: Jane Smith</p>
                </div>
                <button className="text-primary hover:text-primary/80">View</button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;