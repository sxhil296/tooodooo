import BackButton from "@/components/general/backButton";
import Container from "@/components/general/container";
import ChangePriority from "@/components/todo/changePriority";
import MoreOptions from "@/components/todo/moreOptions";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft } from "lucide-react";

export default function TodoDetaisPage() {
  return (
    <div className="w-full">
      <Container>
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center gap-4">
            <BackButton />
            <h4 className="text-xl font-bold">Todo Title</h4>
            <Badge className="rounded-full">High</Badge>
          </div>
          <div className="flex items-center gap-2">
            <ChangePriority />
            <MoreOptions />
          </div>
        </div>

        <div className="max-w-sm">
          <p className="text-lg font-medium mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
            malesuada, lacus nec fringilla tincidunt, nisl purus tincidunt
            tortor, ac fringilla justo libero eget mi. Ut malesuada, lacus nec
            fringilla tincidunt, nisl purus tincidunt tortor, ac fringilla justo
            libero eget mi.
          </p>
        </div>
      </Container>
    </div>
  );
}
