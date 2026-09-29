'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/hooks/use-translation";

const orders = [
  {
    id: "ORD-001",
    date: "2023-10-26",
    item: "The Serene Solitaire",
    status: "Shipped",
    statusKey: "shipped",
  },
  {
    id: "ORD-002",
    date: "2023-10-24",
    item: "Custom Engraved Locket",
    status: "In Production",
    statusKey: "inProduction",
  },
  {
    id: "ORD-003",
    date: "2023-10-22",
    item: "The Celestial Chain",
    status: "Delivered",
    statusKey: "delivered",
  },
  {
    id: "ORD-004",
    date: "2023-10-20",
    item: "The Oceanic Pearl",
    status: "Delivered",
    statusKey: "delivered",
  },
   {
    id: "ORD-005",
    date: "2023-10-28",
    item: "Custom Design Consultation",
    status: "Awaiting Confirmation",
    statusKey: "awaitingConfirmation",
  },
];

const statusVariantMap: { [key: string]: "default" | "secondary" | "outline" | "destructive" } = {
    Shipped: "default",
    "In Production": "secondary",
    Delivered: "outline",
    "Awaiting Confirmation": "destructive"
};


export default function OrdersPage() {
  const { t } = useTranslation('orders');

  return (
    <div className="bg-background">
      <div className="mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl text-foreground">
            {t('title')}
          </h1>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="border rounded-lg overflow-hidden bg-card max-w-4xl mx-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">{t('table.orderId')}</TableHead>
                <TableHead>{t('table.item')}</TableHead>
                <TableHead>{t('table.date')}</TableHead>
                <TableHead className="text-right">{t('table.status')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.item}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={statusVariantMap[order.status] || "default"}>
                        {t(`status.${order.statusKey}`)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
