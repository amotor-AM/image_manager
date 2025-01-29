"use client"

import { useState } from "react"
import { mockUsers } from "./mockData"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { useToast } from "@/components/ui/use-toast"
import { Pencil, Trash2, Save } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function SettingsPage() {
  const [users, setUsers] = useState(mockUsers)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    department: "",
    accessLevel: "",
  })
  const [editingUserId, setEditingUserId] = useState<string | null>(null)
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null)
  const [editedAccessLevel, setEditedAccessLevel] = useState("")
//   const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewUser((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewUser((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newUser.name && newUser.email && newUser.department && newUser.accessLevel) {
      const id = (users.length + 1).toString()
      const avatar = `https://api.dicebear.com/6.x/avataaars/svg?seed=${newUser.name}`
      setUsers([...users, { ...newUser, id, avatar }])
      setNewUser({ name: "", email: "", department: "", accessLevel: "" })
    //   toast({
    //     title: "User Added",
    //     description: `${newUser.name} has been successfully added.`,
    //   })
    } else {
        console.log("error")
    //   toast({
    //     title: "Error",
    //     description: "Please fill in all fields.",
    //     variant: "destructive",
    //   })
    }
  }

  const handleEditClick = (userId: string, currentAccessLevel: string) => {
    setEditingUserId(userId)
    setEditedAccessLevel(currentAccessLevel)
  }

  const handleSaveEdit = (userId: string) => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, accessLevel: editedAccessLevel } : user)))
    setEditingUserId(null)
    // toast({
    //   title: "User Updated",
    //   description: "The user's access level has been updated.",
    // })
  }

  const handleDeleteClick = (userId: string) => {
    setDeletingUserId(userId)
  }

  const confirmDelete = () => {
    if (deletingUserId) {
      setUsers(users.filter((user) => user.id !== deletingUserId))
      setDeletingUserId(null)
    //   toast({
    //     title: "User Deleted",
    //     description: "The user has been successfully removed.",
    //   })
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-8xl">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add New User</CardTitle>
          <CardDescription>Invite a new user to the application</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={newUser.name}
                  onChange={handleInputChange}
                  placeholder="Enter name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  placeholder="Enter email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  name="department"
                  value={newUser.department}
                  onChange={handleInputChange}
                  placeholder="Enter department"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="accessLevel">Access Level</Label>
                <Select value={newUser.accessLevel} onValueChange={(value) => handleSelectChange("accessLevel", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select access level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="User">User</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button type="submit" className="w-full">
              Add User
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Users</CardTitle>
          <CardDescription>List of all users in the application</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Access Level</TableHead>
                <TableHead>Manage User</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span>{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell>
                    {editingUserId === user.id ? (
                      <Select value={editedAccessLevel} onValueChange={setEditedAccessLevel}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select access level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="User">User</SelectItem>
                          <SelectItem value="Manager">Manager</SelectItem>
                          <SelectItem value="Admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      user.accessLevel
                    )}
                  </TableCell>
                  <TableCell>
                    {editingUserId === user.id ? (
                      <Button onClick={() => handleSaveEdit(user.id)} size="sm">
                        <Save className="h-4 w-4" />
                      </Button>
                    ) : (
                      <div className="flex space-x-2">
                        <Button onClick={() => handleEditClick(user.id, user.accessLevel)} size="sm" variant="outline">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button onClick={() => handleDeleteClick(user.id)} size="sm" variant="outline">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <AlertDialog open={!!deletingUserId} onOpenChange={() => setDeletingUserId(null)}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to delete this user?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the user's account and remove their data
                  from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  )
}

