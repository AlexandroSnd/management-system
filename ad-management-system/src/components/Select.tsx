import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectSort({
  onChange,
  value,
}: {
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className="w-max">
        <SelectValue placeholder="Выберите сортировку" />
      </SelectTrigger>
      <SelectContent className="bg-[rgb(36,36,36)]">
        <SelectGroup>
          <SelectItem value="new">Сначала новые</SelectItem>
          <SelectItem value="old">Сначала старые</SelectItem>
          <SelectItem value="expensive">Сначала дорогие</SelectItem>
          <SelectItem value="cheap">Сначала дешевые</SelectItem>
          <SelectItem value="urgent">Сначала срочные</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
