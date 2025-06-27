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

type Student = {
  id: number; // Assuming 'id' is always present and unique for keying
  name: string;
  email: string;
  section?: string;
};

type StudentTableProps = {
  students: Student[];
  onStudentDeleted: () => void; // New prop for refreshing
};

export function StudentTable({
  students,
  onStudentDeleted,
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
              <TableCell className="text-right flex items-center justify-end">
                {/* For actual functionality, pass student.id to SquarePen */}
                {/* Pass student.id to DeleteStudent */}
                <DeleteStudent
                  id={student.id}
                  onStudentDeleted={onStudentDeleted}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
