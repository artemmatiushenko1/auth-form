import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuthContext } from '@/context/auth/auth.js';
import { Role } from '@/lib/enums';
import { Hash, Users2 } from 'lucide-react';
import { UsersTable } from './libs/components/components.js';

const HomePage = () => {
  const { user, signOut } = useAuthContext();

  const [firstNameChar, lastNameChar] = (user?.fullName ?? '')
    .split(' ')
    .map((part) => part.at(0));

  return (
    <div className="w-full h-full flex items-center justify-center bg-background">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div>Profile</div>
            <div>{user?.role === Role.Admin && <Badge>Admin</Badge>}</div>
          </CardTitle>
          <CardDescription>
            Here's information about current user
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex space-x-4 items-center">
              <Avatar>
                <AvatarFallback>
                  {firstNameChar}
                  {lastNameChar}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold">{user?.fullName}</div>
                <div className="text-muted-foreground text-sm">
                  {user?.email}
                </div>
              </div>
            </div>
            <div className="text-sm space-x-3">
              <Badge variant="secondary">
                <Users2 size={16} />: {user?.group}
              </Badge>
              <Badge variant="secondary">
                <Hash size={16} />: {user?.variant}
              </Badge>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={signOut}>
            Sign Out
          </Button>
        </CardFooter>
      </Card>
      <UsersTable />
    </div>
  );
};
export { HomePage };
