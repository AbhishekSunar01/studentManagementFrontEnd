// app/create/page.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { StudentForm } from "@/components/student-form";
import { StudentTable } from "@/components/student-table";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Student = {
  id: number; // Ensure this matches your backend
  name: string;
  email: string;
  section?: string;
};

export default function Create() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:8080/api/v1/students", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch students: ${response.statusText}`);
      }
      const data = await response.json();
      console.log("Fetched students:", data);
      setStudents(data);
    } catch (err) {
      console.error("Error fetching students:", err);
      setError("An error occurred while loading student data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // This function will be called after a student is successfully created OR deleted
  const handleDataChange = () => {
    fetchStudents(); // Re-fetch the student list
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Loading students...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex p-12 w-full">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Add New Student</CardTitle>
          <CardDescription>
            Fill out the form below to add a new student.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Pass the same callback to StudentForm */}
          <StudentForm onStudentCreated={handleDataChange} />
        </CardContent>
      </Card>

      <div className="w-full max-w-2xl ml-12">
        {/* Pass the same callback to StudentTable */}
        <StudentTable students={students} onStudentDeleted={handleDataChange} />
      </div>
    </div>
  );
}
