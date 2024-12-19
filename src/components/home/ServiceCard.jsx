import { 
  FirstAid, 
  Phone, 
  Calendar,
  Pills,
  HeartPulse,
  Syringe,
  Stethoscope,
  Ambulance
} from "lucide-react";
import Card from '../ui/Card';

const icons = {
  FirstAid,
  Phone,
  Calendar,
  Pills,
  HeartPulse,
  Syringe,
  Stethoscope,
  Ambulance
};

const ServiceCard = ({ title, description, icon }) => {
  const Icon = icons[icon];

  return (
    <Card>
      <div className="text-primary mb-4">
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </Card>
  );
};

export default ServiceCard;