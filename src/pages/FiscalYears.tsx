import { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Dashboard, DashboardHeader, DashboardSection } from "@/components/layout/Dashboard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { BarChart, LineChart, PieChart } from "@/components/charts";
import { CircularProgressIndicator } from "@/components/ui/ui-custom/CircularProgressIndicator";
import { FilePlus, SearchIcon, Calendar, Edit, Trash2, Eye, X, Download, FileDown } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useFiscalYears, useFiscalYear, useFiscalYearMutation } from "@/hooks/supabase";
import { FiscalYear } from "@/types/database.types";
import { formatCurrency } from "@/lib/utils";
import { PageLoadingSpinner } from "@/components/ui-custom/PageLoadingSpinner";

// Sample chart data
const monthlyConsumptionData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      label: "AE Consumed",
      data: [120, 190, 230, 250, 320, 380, 410, 450, 510, 550, 590, 630],
      borderColor: "rgb(75, 192, 192)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
    },
    {
      label: "CP Consumed",
      data: [85, 140, 180, 220, 270, 310, 350, 390, 430, 470, 510, 550],
      borderColor: "rgb(153, 102, 255)",
      backgroundColor: "rgba(153, 102, 255, 0.2)",
    },
  ],
};

const budgetDistributionData = {
  labels: ["Education", "Health", "Transport", "Defense", "Agriculture", "Justice", "Foreign Affairs", "Other"],
  datasets: [
    {
      label: "Budget Allocation",
      data: [25, 20, 15, 12, 10, 8, 5, 5],
      backgroundColor: [
        "rgba(255, 99, 132, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(255, 206, 86, 0.6)",
        "rgba(75, 192, 192, 0.6)",
        "rgba(153, 102, 255, 0.6)",
        "rgba(255, 159, 64, 0.6)",
        "rgba(199, 199, 199, 0.6)",
        "rgba(83, 102, 255, 0.6)",
      ],
      borderWidth: 1,
    },
  ],
};

// New mock data for ministerial distribution
const ministryDistributionData = {
  labels: ["Education", "Health", "Transport", "Defense", "Agriculture", "Justice", "Foreign Affairs", "Other"],
  datasets: [
    {
      label: "Budget Allocation (in billions)",
      data: [1.25, 0.98, 0.75, 0.89, 0.62, 0.41, 0.35, 0.48],
      backgroundColor: [
        "rgba(255, 99, 132, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(255, 206, 86, 0.6)",
        "rgba(75, 192, 192, 0.6)",
        "rgba(153, 102, 255, 0.6)",
        "rgba(255, 159, 64, 0.6)",
        "rgba(199, 199, 199, 0.6)",
        "rgba(83, 102, 255, 0.6)",
      ],
    },
  ],
};

// Mock data for program distribution
const programDistributionData = {
  labels: ["Program A", "Program B", "Program C", "Program D", "Program E", "Other Programs"],
  datasets: [
    {
      label: "Allocation by Program",
      data: [0.85, 0.72, 0.65, 0.54, 0.48, 0.76],
      backgroundColor: [
        "rgba(255, 99, 132, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(255, 206, 86, 0.6)",
        "rgba(75, 192, 192, 0.6)",
        "rgba(153, 102, 255, 0.6)",
        "rgba(255, 159, 64, 0.6)",
      ],
    },
  ],
};

// Mock data for subprogram distribution
const subprogramDistributionData = {
  labels: ["Subprogram 1", "Subprogram 2", "Subprogram 3", "Subprogram 4", "Subprogram 5", "Other"],
  datasets: [
    {
      label: "Allocation by Subprogram",
      data: [0.45, 0.38, 0.35, 0.28, 0.25, 0.29],
      backgroundColor: [
        "rgba(255, 99, 132, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(255, 206, 86, 0.6)",
        "rgba(75, 192, 192, 0.6)",
        "rgba(153, 102, 255, 0.6)",
        "rgba(255, 159, 64, 0.6)",
      ],
    },
  ],
};

// Mock data for dotation distribution
const dotationDistributionData = {
  labels: ["Dotation 1", "Dotation 2", "Dotation 3", "Dotation 4"],
  datasets: [
    {
      label: "Allocation by Dotation",
      data: [0.32, 0.28, 0.24, 0.16],
      backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)", "rgba(255, 206, 86, 0.6)", "rgba(75, 192, 192, 0.6)"],
    },
  ],
};

// Mock data for actions distribution
const actionsDistributionData = {
  labels: ["Action 1", "Action 2", "Action 3", "Action 4", "Action 5", "Other Actions"],
  datasets: [
    {
      label: "Allocation by Action",
      data: [0.22, 0.19, 0.17, 0.16, 0.14, 0.12],
      backgroundColor: [
        "rgba(255, 99, 132, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(255, 206, 86, 0.6)",
        "rgba(75, 192, 192, 0.6)",
        "rgba(153, 102, 255, 0.6)",
        "rgba(255, 159, 64, 0.6)",
      ],
    },
  ],
};

// Helper function to get status level
const getStatusVariant = (consumption: number) => {
  if (consumption >= 0.9) return "success";
  if (consumption >= 0.6) return "warning";
  return "destructive";
};

// Helper function to get a badge for consumption status
const getBadge = (label: string, value: number) => {
  const variant = getStatusVariant(value);
  return (
    <Badge variant={variant}>
      {label}: {Math.round(value * 100)}%
    </Badge>
  );
};

export default function FiscalYearsPage() {
  const { t } = useTranslation();
  const [filteredYears, setFilteredYears] = useState<FiscalYear[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedYear, setSelectedYear] = useState<FiscalYear | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isPdfPreviewOpen, setIsPdfPreviewOpen] = useState(false);
  const [generatingPdf, setGeneratingPdf] = useState(false);
  const [newFiscalYearData, setNewFiscalYearData] = useState({
    year: new Date().getFullYear() + 1,
    status: "draft" as FiscalYear["status"],
    description: "",
  });

  // Fetch fiscal years data with entity-level optimizations
  const { data: fiscalYears = [], isLoading: isLoadingFiscalYears, refetch: refetchFiscalYears } = useFiscalYears(); // All optimizations are now in the entity file

  // Use mutation hook for fiscal year operations
  const fiscalYearMutation = useFiscalYearMutation({
    onSuccess: () => {
      refetchFiscalYears();
      toast({
        title: t("common.success"),
        description: t("fiscalYears.operationSuccessful"),
      });
    },
  });

  useEffect(() => {
    // Only process if fiscalYears array has data to prevent unnecessary updates
    if (fiscalYears.length === 0) {
      setFilteredYears([]);
      return;
    }

    let result = [...fiscalYears]; // Create a copy only once

    // Filter by search term
    if (searchTerm) {
      result = result.filter(
        (fy) => fy.year.toString().includes(searchTerm) || (fy.description?.toLowerCase() || "").includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      result = result.filter((fy) => fy.status === statusFilter);
    }

    // Sort by year (descending)
    result.sort((a, b) => b.year - a.year);

    // Update filtered years without checking current state
    // This eliminates the dependency on filteredYears and breaks the infinite loop
    setFilteredYears(result);
  }, [fiscalYears, searchTerm, statusFilter]); // Remove filteredYears from dependencies

  const handleViewDetails = (fiscalYear: FiscalYear) => {
    setSelectedYear(fiscalYear);
    setIsDetailsDialogOpen(true);
  };

  const handleEditFiscalYear = (fiscalYear: FiscalYear) => {
    setSelectedYear(fiscalYear);
    setNewFiscalYearData({
      year: fiscalYear.year,
      status: fiscalYear.status,
      description: fiscalYear.description || "",
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteFiscalYear = (fiscalYear: FiscalYear) => {
    setSelectedYear(fiscalYear);
    setIsDeleteDialogOpen(true);
  };

  const handleSaveFiscalYear = async () => {
    try {
      await fiscalYearMutation.mutateAsync({
        type: "INSERT",
        data: {
          year: newFiscalYearData.year,
          status: newFiscalYearData.status,
          description: newFiscalYearData.description || null,
        },
      });

      setIsAddDialogOpen(false);
      toast({
        title: t("fiscalYears.addedSuccess"),
        description: t("fiscalYears.addedSuccessDescription"),
      });
    } catch (error) {
      console.error("Error creating fiscal year:", error);
      toast({
        title: t("common.error"),
        description: t("fiscalYears.createError"),
        variant: "destructive",
      });
    }
  };

  const handleUpdateFiscalYear = async () => {
    if (!selectedYear) return;

    try {
      await fiscalYearMutation.mutateAsync({
        type: "UPDATE",
        id: selectedYear.id,
        data: {
          year: newFiscalYearData.year,
          status: newFiscalYearData.status,
          description: newFiscalYearData.description || null,
        },
      });

      setIsEditDialogOpen(false);
      toast({
        title: t("fiscalYears.updatedSuccess"),
        description: t("fiscalYears.updatedSuccessDescription"),
      });
    } catch (error) {
      console.error("Error updating fiscal year:", error);
      toast({
        title: t("common.error"),
        description: t("fiscalYears.updateError"),
        variant: "destructive",
      });
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedYear) return;

    try {
      await fiscalYearMutation.mutateAsync({
        type: "DELETE",
        id: selectedYear.id,
      });

      setIsDeleteDialogOpen(false);
      toast({
        title: t("fiscalYears.deletedSuccess"),
        description: t("fiscalYears.deletedSuccessDescription"),
      });
    } catch (error) {
      console.error("Error deleting fiscal year:", error);
      toast({
        title: t("common.error"),
        description: t("fiscalYears.deleteError"),
        variant: "destructive",
      });
    }
  };

  const handleGeneratePdf = (fiscalYear: FiscalYear) => {
    setSelectedYear(fiscalYear);
    setGeneratingPdf(true);

    // Simulate PDF generation with a delay
    setTimeout(() => {
      setGeneratingPdf(false);
      setIsPdfPreviewOpen(true);

      toast({
        title: t("fiscalYears.pdfGenerated"),
        description: t("fiscalYears.pdfGeneratedDescription"),
      });
    }, 1500);
  };

  const handleDownloadPdf = () => {
    // Simulate PDF download
    toast({
      title: t("fiscalYears.pdfDownloaded"),
      description: t("fiscalYears.pdfDownloadedDescription"),
    });
    setIsPdfPreviewOpen(false);
  };

  const getStatusBadge = (status: FiscalYear["status"]) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border-green-400">
            {t("fiscalYears.status.active")}
          </Badge>
        );
      case "planning":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border-blue-400">
            {t("fiscalYears.status.planning")}
          </Badge>
        );
      case "closed":
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300 border-gray-400">
            {t("fiscalYears.status.closed")}
          </Badge>
        );
      case "draft":
      default:
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 border-yellow-400">
            {t("fiscalYears.status.draft")}
          </Badge>
        );
    }
  };

  if (isLoadingFiscalYears) {
    return <PageLoadingSpinner message="Chargement des années fiscales..." />;
  }

  return (
    <Dashboard>
      <DashboardHeader title={t("fiscalYears.title")} description={t("fiscalYears.subtitle")}>
        <Button onClick={() => setIsAddDialogOpen(true)} className="ml-auto">
          <FilePlus className="mr-2 h-4 w-4" />
          {t("fiscalYears.addNew")}
        </Button>
      </DashboardHeader>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{t("fiscalYears.filters.title")}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Label htmlFor="searchInput">{t("fiscalYears.filters.search")}</Label>
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="searchInput"
                type="search"
                placeholder={t("fiscalYears.filters.searchPlaceholder")}
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full md:w-64">
            <Label htmlFor="statusFilter">{t("fiscalYears.filters.status")}</Label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger id="statusFilter">
                <SelectValue placeholder={t("fiscalYears.filters.allStatuses")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("fiscalYears.filters.allStatuses")}</SelectItem>
                <SelectItem value="planning">{t("fiscalYears.status.planning")}</SelectItem>
                <SelectItem value="active">{t("fiscalYears.status.active")}</SelectItem>
                <SelectItem value="closed">{t("fiscalYears.status.closed")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Fiscal Year Cards */}
      <DashboardSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredYears.map((fiscalYear) => (
            <Card key={fiscalYear.id} className="overflow-hidden transition-all hover:shadow-md flex flex-col justify-between">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl flex items-center">
                      <Calendar className="mr-2 h-5 w-5 text-primary" />
                      {fiscalYear.year}
                    </CardTitle>
                    <CardDescription>{t("fiscalYears.fiscalYear")}</CardDescription>
                  </div>
                  {getStatusBadge(fiscalYear.status)}
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{t("fiscalYears.allocatedAE")}</p>
                    <p className="font-semibold">{formatCurrency(fiscalYear.totalAllocatedAE)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{t("fiscalYears.allocatedCP")}</p>
                    <p className="font-semibold">{formatCurrency(fiscalYear.totalAllocatedCP)}</p>
                  </div>
                </div>

                {fiscalYear.description && (
                  <div className="mb-4 text-sm text-muted-foreground">
                    <p className="line-clamp-2">{fiscalYear.description}</p>
                  </div>
                )}

                <div className="space-y-4 mb-4">
                  {/* AE Consumption Progress */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t("fiscalYears.aeConsumption")}</span>
                      <span className="font-medium">{Math.round((fiscalYear.consumedAE / fiscalYear.totalAllocatedAE) * 100)}%</span>
                    </div>
                    <Progress value={(fiscalYear.consumedAE / fiscalYear.totalAllocatedAE) * 100} className="h-2" />
                  </div>

                  {/* CP Consumption Progress */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t("fiscalYears.cpConsumption")}</span>
                      <span className="font-medium">{Math.round((fiscalYear.consumedCP / fiscalYear.totalAllocatedCP) * 100)}%</span>
                    </div>
                    <Progress value={(fiscalYear.consumedCP / fiscalYear.totalAllocatedCP) * 100} className="h-2" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center mt-4">
                  <div className="bg-primary/10 rounded-md p-2">
                    <p className="text-xs text-muted-foreground">{t("fiscalYears.ministries")}</p>
                    <p className="font-semibold">{fiscalYear.ministryCount}</p>
                  </div>
                  <div className="bg-primary/10 rounded-md p-2">
                    <p className="text-xs text-muted-foreground">{t("fiscalYears.portfolios")}</p>
                    <p className="font-semibold">{fiscalYear.portfolioCount}</p>
                  </div>
                  <div className="bg-primary/10 rounded-md p-2">
                    <p className="text-xs text-muted-foreground">{t("fiscalYears.programs")}</p>
                    <p className="font-semibold">{fiscalYear.programCount}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-4 pb-4 flex flex-wrap justify-center gap-2 border-t">
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => handleViewDetails(fiscalYear)} title={t("common.view")}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleEditFiscalYear(fiscalYear)} title={t("common.edit")}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDeleteFiscalYear(fiscalYear)}
                    className="hover:bg-destructive/10"
                    title={t("common.delete")}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleGeneratePdf(fiscalYear)}
                    disabled={generatingPdf && selectedYear?.id === fiscalYear.id}
                    title={generatingPdf && selectedYear?.id === fiscalYear.id ? t("fiscalYears.generatingPdf") : t("fiscalYears.generatePdfReport")}
                  >
                    <FileDown className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </DashboardSection>

      {/* Fiscal Year Details Dialog */}
      {selectedYear && (
        <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  {t("fiscalYears.detailsTitle", { year: selectedYear.year })}
                </DialogTitle>
                {getStatusBadge(selectedYear.status)}
              </div>
              <DialogDescription>{t("fiscalYears.detailsSubtitle")}</DialogDescription>
            </DialogHeader>

            {selectedYear.description && (
              <div className="bg-muted/50 p-3 rounded-md">
                <p className="text-sm">{selectedYear.description}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              {/* Summary Card */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>{t("fiscalYears.summary")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">{t("fiscalYears.allocatedAE")}</p>
                      <p className="font-semibold">{formatCurrency(selectedYear.totalAllocatedAE)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t("fiscalYears.allocatedCP")}</p>
                      <p className="font-semibold">{formatCurrency(selectedYear.totalAllocatedCP)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t("fiscalYears.consumedAE")}</p>
                      <p className="font-semibold">{formatCurrency(selectedYear.consumedAE)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t("fiscalYears.consumedCP")}</p>
                      <p className="font-semibold">{formatCurrency(selectedYear.consumedCP)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t("fiscalYears.engagements")}</p>
                      <p className="font-semibold">{selectedYear.engagementCount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t("fiscalYears.programs")}</p>
                      <p className="font-semibold">{selectedYear.programCount}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Progress Card */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>{t("fiscalYears.progress")}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center pt-4">
                  <div className="grid grid-cols-2 gap-8 w-full">
                    <div className="flex flex-col items-center">
                      <CircularProgressIndicator
                        value={Math.round((selectedYear.consumedAE / selectedYear.totalAllocatedAE) * 100)}
                        size={120}
                        strokeWidth={10}
                        color="primary"
                      />
                      <p className="mt-2 font-medium">{t("fiscalYears.aeConsumption")}</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <CircularProgressIndicator
                        value={Math.round((selectedYear.consumedCP / selectedYear.totalAllocatedCP) * 100)}
                        size={120}
                        strokeWidth={10}
                        color="secondary"
                      />
                      <p className="mt-2 font-medium">{t("fiscalYears.cpConsumption")}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Consumption Over Time Chart */}
              <Card className="md:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle>{t("fiscalYears.consumptionOverTime")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <LineChart data={monthlyConsumptionData} />
                  </div>
                </CardContent>
              </Card>

              {/* Budget Distribution Chart */}
              <Card className="md:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle>{t("fiscalYears.budgetDistribution")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="h-[300px]">
                      <PieChart data={budgetDistributionData} />
                    </div>
                    <div className="h-[300px]">
                      <BarChart data={budgetDistributionData} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDetailsDialogOpen(false)}>
                {t("common.close")}
              </Button>
              <Button>{t("fiscalYears.viewFullReport")}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Add Fiscal Year Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
          <DialogHeader>
            <DialogTitle>{t("fiscalYears.addNewTitle")}</DialogTitle>
            <DialogDescription>{t("fiscalYears.addNewDescription")}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="year">{t("fiscalYears.yearField")}</Label>
              <Input
                id="year"
                type="number"
                min="2000"
                max="2100"
                value={newFiscalYearData.year}
                onChange={(e) => setNewFiscalYearData({ ...newFiscalYearData, year: parseInt(e.target.value) })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">{t("fiscalYears.statusField")}</Label>
              <Select
                value={newFiscalYearData.status}
                onValueChange={(value: FiscalYear["status"]) => setNewFiscalYearData({ ...newFiscalYearData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("fiscalYears.selectStatus")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">{t("fiscalYears.status.draft")}</SelectItem>
                  <SelectItem value="planning">{t("fiscalYears.status.planning")}</SelectItem>
                  <SelectItem value="active">{t("fiscalYears.status.active")}</SelectItem>
                  <SelectItem value="closed">{t("fiscalYears.status.closed")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">{t("fiscalYears.descriptionField")}</Label>
              <Textarea
                id="description"
                placeholder={t("fiscalYears.descriptionPlaceholder")}
                value={newFiscalYearData.description}
                onChange={(e) => setNewFiscalYearData({ ...newFiscalYearData, description: e.target.value })}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              {t("common.cancel")}
            </Button>
            <Button onClick={handleSaveFiscalYear}>{t("common.create")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Fiscal Year Dialog */}
      {selectedYear && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
            <DialogHeader>
              <DialogTitle>{t("fiscalYears.editTitle")}</DialogTitle>
              <DialogDescription>{t("fiscalYears.editDescription")}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-year">{t("fiscalYears.yearField")}</Label>
                <Input
                  id="edit-year"
                  type="number"
                  min="2000"
                  max="2100"
                  value={newFiscalYearData.year}
                  onChange={(e) => setNewFiscalYearData({ ...newFiscalYearData, year: parseInt(e.target.value) })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-status">{t("fiscalYears.statusField")}</Label>
                <Select
                  value={newFiscalYearData.status}
                  onValueChange={(value: FiscalYear["status"]) => setNewFiscalYearData({ ...newFiscalYearData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("fiscalYears.selectStatus")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">{t("fiscalYears.status.draft")}</SelectItem>
                    <SelectItem value="planning">{t("fiscalYears.status.planning")}</SelectItem>
                    <SelectItem value="active">{t("fiscalYears.status.active")}</SelectItem>
                    <SelectItem value="closed">{t("fiscalYears.status.closed")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">{t("fiscalYears.descriptionField")}</Label>
                <Textarea
                  id="edit-description"
                  placeholder={t("fiscalYears.descriptionPlaceholder")}
                  value={newFiscalYearData.description}
                  onChange={(e) => setNewFiscalYearData({ ...newFiscalYearData, description: e.target.value })}
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                {t("common.cancel")}
              </Button>
              <Button onClick={handleUpdateFiscalYear}>{t("common.update")}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("fiscalYears.deleteTitle")}</AlertDialogTitle>
            <AlertDialogDescription>{t("fiscalYears.deleteDescription")}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-destructive text-destructive-foreground">
              {t("common.delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* PDF Preview Dialog */}
      {selectedYear && (
        <Dialog open={isPdfPreviewOpen} onOpenChange={setIsPdfPreviewOpen}>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
            <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileDown className="h-5 w-5 text-primary" />
                {t("fiscalYears.pdfReportTitle", { year: selectedYear.year })}
              </DialogTitle>
              <DialogDescription>{t("fiscalYears.pdfReportDescription")}</DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Report Header */}
              <div className="text-center space-y-2 border-b pb-4">
                <h1 className="text-2xl font-bold">{t("fiscalYears.reportTitle")}</h1>
                <h2 className="text-xl">
                  {t("fiscalYears.fiscalYear")} {selectedYear.year}
                </h2>
                <p className="text-muted-foreground">{new Date().toLocaleDateString()}</p>
              </div>

              {/* Summary Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">{t("fiscalYears.summary")}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{t("fiscalYears.allocatedAE")}</p>
                    <p className="font-semibold">{formatCurrency(selectedYear.totalAllocatedAE)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{t("fiscalYears.allocatedCP")}</p>
                    <p className="font-semibold">{formatCurrency(selectedYear.totalAllocatedCP)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{t("fiscalYears.consumedAE")}</p>
                    <p className="font-semibold">{formatCurrency(selectedYear.consumedAE)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{t("fiscalYears.consumedCP")}</p>
                    <p className="font-semibold">{formatCurrency(selectedYear.consumedCP)}</p>
                  </div>
                </div>
              </div>

              {/* Consumption Progress Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">{t("fiscalYears.progress")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col items-center">
                    <CircularProgressIndicator
                      value={Math.round((selectedYear.consumedAE / selectedYear.totalAllocatedAE) * 100)}
                      size={150}
                      strokeWidth={12}
                      color="primary"
                      showValue={true}
                      label={t("fiscalYears.aeConsumption")}
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <CircularProgressIndicator
                      value={Math.round((selectedYear.consumedCP / selectedYear.totalAllocatedCP) * 100)}
                      size={150}
                      strokeWidth={12}
                      color="secondary"
                      showValue={true}
                      label={t("fiscalYears.cpConsumption")}
                    />
                  </div>
                </div>
              </div>

              {/* Monthly Consumption Chart */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">{t("fiscalYears.consumptionOverTime")}</h3>
                <div className="h-[300px]">
                  <LineChart data={monthlyConsumptionData} />
                </div>
              </div>

              {/* Ministry Distribution */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">{t("fiscalYears.ministryDistribution")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="h-[300px]">
                    <PieChart data={ministryDistributionData} />
                  </div>
                  <div className="h-[300px]">
                    <BarChart data={ministryDistributionData} />
                  </div>
                </div>
              </div>

              {/* Programs Distribution */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">{t("fiscalYears.programDistribution")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="h-[300px]">
                    <PieChart data={programDistributionData} />
                  </div>
                  <div className="h-[300px]">
                    <BarChart data={programDistributionData} />
                  </div>
                </div>
              </div>

              {/* Subprograms Distribution */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">{t("fiscalYears.subprogramDistribution")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="h-[300px]">
                    <PieChart data={subprogramDistributionData} />
                  </div>
                  <div className="h-[300px]">
                    <BarChart data={subprogramDistributionData} />
                  </div>
                </div>
              </div>

              {/* Dotations Distribution */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">{t("fiscalYears.dotationDistribution")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="h-[300px]">
                    <PieChart data={dotationDistributionData} />
                  </div>
                  <div className="h-[300px]">
                    <BarChart data={dotationDistributionData} />
                  </div>
                </div>
              </div>

              {/* Actions Distribution */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">{t("fiscalYears.actionDistribution")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="h-[300px]">
                    <PieChart data={actionsDistributionData} />
                  </div>
                  <div className="h-[300px]">
                    <BarChart data={actionsDistributionData} />
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsPdfPreviewOpen(false)}>
                {t("common.close")}
              </Button>
              <Button onClick={handleDownloadPdf} className="gap-2">
                <Download className="h-4 w-4" />
                {t("fiscalYears.downloadPdf")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Dashboard>
  );
}
