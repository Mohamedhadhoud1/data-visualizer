import { useContext, useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { UserContext } from "../context/userContext";
import { useToast } from "../components/ui/use-toast";


export function Sitting() {
  const [error, setError] = useState('');
  const [error2, setError2] = useState("");
  const { user } = useContext(UserContext);
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [userName, setUserName] = useState(user?.userName);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { toast } = useToast();

  const updateName = async ()=>{
      const response = await fetch(
        `https://data-visualizer-production.up.railway.app/users/${user?.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json", "Origin": "*" },
          credentials: "include",
          body: JSON.stringify({
            updateUserDto: {
              firstName: firstName,
              lastName: lastName,
              userName: userName,
            },
          }),
        }
      );

      const content = await response.json();
      if (content.message === "success") {
        setFirstName(content.firstName);
        setLastName(content.lastName);
        setUserName(content.userName);
        setError('');
         toast({
           title: "Name Updated Successfully",
         });
      } else {
        setError(content.message);
      }
  }
   const updatePassword = async () => {
    //if(currentPassword===user.password)
     const response = await fetch(
       `https://data-visualizer-production.up.railway.app/users/${user?.id}`,
       {
         method: "PATCH",
         mode: "no-cors",
         headers: { "Content-Type": "application/json" },
         credentials: "include",
         body: JSON.stringify({
           updateUserDto: { password: newPassword },
           currentPassword: currentPassword,
         }),
       }
     );

     const content = await response.json();
     if (content.message === "success") {
      setError2('');
      toast({
        title: "Password Updated Successfully",
      });
     } else {
       setError2(content.message);
     }
   };
  return (
    <Tabs defaultValue="account" className="sm:mx-auto my-20 mx-5 sm:w-[70%] ">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-2">
            <p className="text-red-500 text-center">{error ? error : null}</p>
            <div className="space-y-1">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                placeholder="Your First Name"
                defaultValue={user?.firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Your Last Name"
                defaultValue={user?.lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={updateName}>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-red-500 text-center">{error2 ? error2 : null}</p>
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input
                id="current"
                type="password"
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input
                id="new"
                type="password"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={updatePassword}>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
