"use client"

import { useState } from "react"
import { mockUserData } from "./mockData"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, Mail, Users } from "lucide-react"
// import { useToast } from "@/components/ui/use-toast"

export default function ProfilePage() {
  const [userData, setUserData] = useState(mockUserData)
  const [isResettingPin, setIsResettingPin] = useState(false)
  const [newPin, setNewPin] = useState("")
  const [isLoading, setIsLoading] = useState(false)
//   const { toast } = useToast()

  const handleResetPin = async () => {
    if (newPin.length === 4 && /^\d+$/.test(newPin)) {
      setIsLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setUserData({ ...userData, pin: newPin })
      setNewPin("")
      setIsResettingPin(false)
      setIsLoading(false)
    //   toast({
    //     title: "PIN Updated",
    //     description: "Your PIN has been successfully updated.",
    //     duration: 3000,
    //   })
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Profile</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Your account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={userData.avatar} alt={userData.name} />
                <AvatarFallback>
                  {userData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold">{userData.name}</h2>
                <p className="text-sm text-gray-500">{userData.department}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <span>{userData.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-gray-500" />
                <span>{userData.department}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>Manage your account security</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Lock className="h-4 w-4 text-gray-500" />
                <span>Account PIN</span>
              </div>
              <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{userData.pin.replace(/./g, "*")}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => setIsResettingPin(true)} variant="outline" className="w-full">
              Reset PIN
            </Button>
          </CardFooter>
        </Card>
      </div>

      {isResettingPin && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Reset PIN</CardTitle>
            <CardDescription>Enter a new 4-digit PIN for your account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="new-pin">New PIN</Label>
              <Input
                id="new-pin"
                type="password"
                placeholder="Enter new PIN"
                value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
                maxLength={4}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="ghost" onClick={() => setIsResettingPin(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button onClick={handleResetPin} disabled={isLoading}>
              {isLoading ? "Updating..." : "Set New PIN"}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}