import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Edit, LogOut, Calendar, Link as LinkIcon, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";

type Reservation = Tables<"reservations">;

const ADMIN_PASSWORD = "ureki2024"; // Simple password gate — change this

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();

  // Form state
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [cottageNumber, setCottageNumber] = useState("1");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const saved = sessionStorage.getItem("admin_auth");
    if (saved === "true") setAuthenticated(true);
  }, []);

  useEffect(() => {
    if (authenticated) fetchReservations();
  }, [authenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      sessionStorage.setItem("admin_auth", "true");
    } else {
      toast({ title: "Wrong password", variant: "destructive" });
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    sessionStorage.removeItem("admin_auth");
  };

  const fetchReservations = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("reservations")
      .select("*")
      .order("check_in", { ascending: true });
    if (error) {
      toast({ title: "Error loading reservations", description: error.message, variant: "destructive" });
    } else {
      setReservations(data || []);
    }
    setLoading(false);
  };

  const resetForm = () => {
    setGuestName("");
    setGuestPhone("");
    setCottageNumber("1");
    setCheckIn("");
    setCheckOut("");
    setNotes("");
    setEditingId(null);
  };

  const openEdit = (r: Reservation) => {
    setGuestName(r.guest_name);
    setGuestPhone(r.guest_phone || "");
    setCottageNumber(String(r.cottage_number));
    setCheckIn(r.check_in);
    setCheckOut(r.check_out);
    setNotes(r.notes || "");
    setEditingId(r.id);
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !checkIn || !checkOut) {
      toast({ title: "Please fill in required fields", variant: "destructive" });
      return;
    }

    const payload: TablesInsert<"reservations"> = {
      guest_name: guestName.trim(),
      guest_phone: guestPhone.trim() || null,
      cottage_number: parseInt(cottageNumber),
      check_in: checkIn,
      check_out: checkOut,
      notes: notes.trim() || null,
    };

    let error;
    if (editingId) {
      ({ error } = await supabase.from("reservations").update(payload).eq("id", editingId));
    } else {
      ({ error } = await supabase.from("reservations").insert(payload));
    }

    if (error) {
      toast({ title: "Error saving reservation", description: error.message, variant: "destructive" });
    } else {
      toast({ title: editingId ? "Reservation updated" : "Reservation added" });
      resetForm();
      setDialogOpen(false);
      fetchReservations();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this reservation?")) return;
    const { error } = await supabase.from("reservations").delete().eq("id", id);
    if (error) {
      toast({ title: "Error deleting", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Reservation deleted" });
      fetchReservations();
    }
  };

  const getStatus = (checkIn: string, checkOut: string) => {
    const today = new Date().toISOString().split("T")[0];
    if (checkOut < today) return "past";
    if (checkIn <= today && checkOut >= today) return "current";
    return "upcoming";
  };

  const statusBadge = (checkIn: string, checkOut: string) => {
    const status = getStatus(checkIn, checkOut);
    const variants: Record<string, { label: string; className: string }> = {
      past: { label: "Past", className: "bg-muted text-muted-foreground" },
      current: { label: "Now", className: "bg-green-500 text-white" },
      upcoming: { label: "Upcoming", className: "bg-primary text-primary-foreground" },
    };
    const v = variants[status];
    return <Badge className={v.className}>{v.label}</Badge>;
  };

  const icalUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ical-feed`;

  const copyIcalUrl = () => {
    navigator.clipboard.writeText(icalUrl);
    toast({ title: "iCal URL copied!" });
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="text-primary" size={24} />
              Admin Login
            </CardTitle>
            <CardDescription>Enter password to manage reservations</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
              <Button type="submit" className="w-full">Login</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-background border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Calendar className="text-primary" size={24} />
            Reservations
          </h1>
          <div className="flex items-center gap-2">
            <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus size={16} />
                  Add
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>{editingId ? "Edit Reservation" : "New Reservation"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="guestName">Guest Name *</Label>
                    <Input id="guestName" value={guestName} onChange={(e) => setGuestName(e.target.value)} required />
                  </div>
                  <div>
                    <Label htmlFor="guestPhone">Phone</Label>
                    <Input id="guestPhone" value={guestPhone} onChange={(e) => setGuestPhone(e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="cottage">Cottage #</Label>
                    <Select value={cottageNumber} onValueChange={setCottageNumber}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                          <SelectItem key={n} value={String(n)}>Cottage {n}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="checkIn">Check-in *</Label>
                      <Input id="checkIn" type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} required />
                    </div>
                    <div>
                      <Label htmlFor="checkOut">Check-out *</Label>
                      <Input id="checkOut" type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} required />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Optional notes..." rows={2} />
                  </div>
                  <Button type="submit" className="w-full">{editingId ? "Update" : "Add Reservation"}</Button>
                </form>
              </DialogContent>
            </Dialog>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut size={16} />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* iCal Sync Card */}
        <Card>
          <CardContent className="py-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <LinkIcon size={16} className="text-primary" />
                Booking.com Sync URL:
              </div>
              <code className="text-xs bg-muted px-2 py-1 rounded flex-1 break-all">{icalUrl}</code>
              <Button variant="outline" size="sm" onClick={copyIcalUrl}>
                <Copy size={14} />
                Copy
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Reservations Table */}
        <Card>
          <CardContent className="p-0">
            {loading ? (
              <div className="p-8 text-center text-muted-foreground">Loading...</div>
            ) : reservations.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                No reservations yet. Click "Add" to create your first one.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Status</TableHead>
                      <TableHead>Guest</TableHead>
                      <TableHead>Cottage</TableHead>
                      <TableHead>Check-in</TableHead>
                      <TableHead>Check-out</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reservations.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell>{statusBadge(r.check_in, r.check_out)}</TableCell>
                        <TableCell className="font-medium">{r.guest_name}</TableCell>
                        <TableCell>#{r.cottage_number}</TableCell>
                        <TableCell>{r.check_in}</TableCell>
                        <TableCell>{r.check_out}</TableCell>
                        <TableCell>{r.guest_phone || "—"}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon" onClick={() => openEdit(r)}>
                              <Edit size={16} />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDelete(r.id)}>
                              <Trash2 size={16} className="text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
