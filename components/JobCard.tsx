import { MapPin, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image, { type StaticImageData } from "next/image";

interface JobCardProps {
  title: string;
  location: string;
  pay: string;
  image: string;
}

const JobCard = ({ title, location, pay, image }: JobCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group flex-shrink-0 w-full">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4 space-y-2">
        <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-accent">
          <DollarSign className="h-4 w-4" />
          <span>{pay}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant="outline" className="w-full rounded-lg font-medium">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
