import TemplateCardSmall from "./TemplateCardSmall";
import type { TemplateListItem } from "../../../stores/templateListStore";

type TemplateGridProps = {
    templates: TemplateListItem[];
};

const TemplateGrid: React.FC<TemplateGridProps> = ({ templates }) => {
    return (
        <div className="mx-auto grid grid-cols-4 w-[1200px] gap-[32px]">
            {templates.map((item) => (
                <TemplateCardSmall
                key={item.templateNo}
                template={item}
                onRename={() => {}}
                onEdit={() => {}}
                onDuplicate={() => {}}
                onDelete={() => {}} />
            ))}
        </div>
    );
};

export default TemplateGrid;
