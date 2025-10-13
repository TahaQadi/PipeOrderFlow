
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/components/LanguageProvider';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageToggle } from '@/components/LanguageToggle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Download, FileText, Eye } from 'lucide-react';
import { Link } from 'wouter';
import { formatDistanceToNow } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';
import { safeJsonParse } from '@/lib/safeJson';

interface Notification {
  id: string;
  clientId: string;
  type: string;
  titleEn: string;
  titleAr: string;
  messageEn: string;
  messageAr: string;
  pdfFileName?: string | null;
  metadata: string | null;
  createdAt: string;
}

interface Client {
  id: string;
  nameEn: string;
  nameAr: string;
  email: string | null;
  phone: string | null;
}

export default function AdminOffersPage() {
  const { language } = useLanguage();

  const { data: notifications = [], isLoading: notificationsLoading } = useQuery<Notification[]>({
    queryKey: ['/api/client/notifications'],
  });

  const { data: clients = [], isLoading: clientsLoading } = useQuery<Client[]>({
    queryKey: ['/api/admin/clients'],
  });

  // Filter notifications that have PDF files (price offers)
  const offerNotifications = notifications.filter(
    n => n.type === 'price_offer_ready' && n.pdfFileName
  );

  // Create a map of client IDs to client data
  const clientMap = new Map(clients.map(c => [c.id, c]));

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, {
      addSuffix: true,
      locale: language === 'ar' ? ar : enUS,
    });
  };

  const handleDownload = (fileName: string) => {
    window.open(`/api/pdf/download/${fileName}`, '_blank');
  };

  const isLoading = notificationsLoading || clientsLoading;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 dark:from-black dark:via-[#1a1a1a] dark:to-black">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary/5 dark:bg-[#d4af37]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-primary/5 dark:bg-[#d4af37]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <header className="sticky top-0 z-50 border-b border-border/50 dark:border-[#d4af37]/20 bg-background/95 dark:bg-black/80 backdrop-blur-xl shadow-sm">
        <div className="container mx-auto px-3 sm:px-4 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-3 min-w-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <Button variant="ghost" size="icon" asChild className="h-9 w-9 sm:h-10 sm:w-10 text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300">
              <Link href="/admin">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-xl font-semibold">
              {language === 'ar' ? 'عروض الأسعار المُنشأة' : 'Generated Price Offers'}
            </h1>
            {offerNotifications.length > 0 && (
              <Badge variant="secondary">{offerNotifications.length}</Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 relative z-10">
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {language === 'ar' ? 'جاري التحميل...' : 'Loading...'}
            </p>
          </div>
        ) : offerNotifications.length === 0 ? (
          <Card className="p-16 text-center">
            <div className="flex flex-col items-center gap-4">
              <FileText className="h-20 w-20 text-muted-foreground opacity-50" />
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">
                  {language === 'ar' ? 'لا توجد عروض أسعار' : 'No Price Offers'}
                </h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  {language === 'ar'
                    ? 'لم يتم إنشاء أي عروض أسعار بعد'
                    : 'No price offers have been generated yet'}
                </p>
              </div>
            </div>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'ar' ? 'جميع عروض الأسعار' : 'All Price Offers'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{language === 'ar' ? 'العميل' : 'Client'}</TableHead>
                    <TableHead>{language === 'ar' ? 'اسم الملف' : 'File Name'}</TableHead>
                    <TableHead>{language === 'ar' ? 'التاريخ' : 'Date'}</TableHead>
                    <TableHead>{language === 'ar' ? 'المنتجات' : 'Products'}</TableHead>
                    <TableHead className="text-end">{language === 'ar' ? 'إجراءات' : 'Actions'}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {offerNotifications.map((notification) => {
                    const client = clientMap.get(notification.clientId);
                    const metadata = safeJsonParse(notification.metadata, {});
                    const productCount = metadata.productCount || 0;
                    const fileName = notification.pdfFileName?.split('/').pop() || notification.pdfFileName;

                    return (
                      <TableRow key={notification.id}>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-medium">
                              {client ? (language === 'ar' ? client.nameAr : client.nameEn) : '-'}
                            </p>
                            {client?.email && (
                              <p className="text-xs text-muted-foreground">{client.email}</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span className="font-mono text-sm truncate max-w-[200px]" title={fileName}>
                              {fileName}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-muted-foreground">
                            {formatDate(notification.createdAt)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {productCount} {language === 'ar' ? 'منتج' : 'product(s)'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-end">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDownload(notification.pdfFileName!)}
                              className="gap-2"
                            >
                              <Download className="h-4 w-4" />
                              <span className="hidden sm:inline">
                                {language === 'ar' ? 'تنزيل' : 'Download'}
                              </span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
