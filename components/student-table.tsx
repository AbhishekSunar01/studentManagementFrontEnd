// components/student-table.tsx
// (No changes needed in this file beyond the ones suggested previously)

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader } from "./ui/card";
import { DeleteStudent } from "./delete-student"; // Ensure this component is functional
import { UpdateStudent } from "./update-student";

type Student = {
  id: number; // Assuming 'id' is always present and unique for keying
  name: string;
  email: string;
  section?: string;
};

type StudentTableProps = {
  students: Student[];
  onhandleDataChange: () => void; // New prop for refreshing
};

export function StudentTable({
  students,
  onhandleDataChange,
}: StudentTableProps) {
  return (
    <Card className="p-6">
      <CardHeader>Student List</CardHeader>

      <Table className="p-6">
        <TableCaption>A list of registered students.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">S.no</TableHead>
            <TableHead>Student Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Section</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student, index) => (
            // Use student.id as the key if available, otherwise fallback to index (less ideal)
            <TableRow key={student.id || index}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{student.section}</TableCell>
              <TableCell className="text-right flex items-center justify-end gap-2.5">
                {/* For actual functionality, pass student.id to SquarePen */}
                {/* Pass student.id to DeleteStudent */}
                <UpdateStudent
                  id={student.id}
                  onStudentUpdated={onhandleDataChange} // Assuming this prop is used to refresh data
                />
                {/* Assuming UpdateStudent is a functional component that handles updates */}
                <DeleteStudent
                  id={student.id}
                  onStudentDeleted={onhandleDataChange}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
