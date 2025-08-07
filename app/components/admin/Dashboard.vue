<script setup lang="ts">
import { ref, onUnmounted, watchEffect, nextTick } from "vue";
import { useAdminData } from "~/composables/useAdminData";
import {
  Chart as ChartJS,
  BarController,
  DoughnutController,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  type ChartConfiguration,
} from "chart.js";

ChartJS.register(
  BarController,
  DoughnutController,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const toast = useToast();
const {
  dashboardSummary: dashboardData,
  monthlyRevenue,
  salesBreakdown,
} = useAdminData();

const revenueChart = ref<HTMLCanvasElement | null>(null);
const breakdownChart = ref<HTMLCanvasElement | null>(null);

let revenueChartInstance: ChartJS | null = null;
let breakdownChartInstance: ChartJS | null = null;

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(amount);
};

const initCharts = () => {
  nextTick(() => {
    if (revenueChart.value) {
      const revenueConfig: ChartConfiguration = {
        type: "bar",
        data: {
          labels: monthlyRevenue.value.map((item) => item.month),
          datasets: [
            {
              label: "Revenue ($)",
              data: monthlyRevenue.value.map((item) => item.revenue),
              backgroundColor: "rgba(59, 130, 246, 0.6)",
              borderColor: "rgb(59, 130, 246)",
              borderWidth: 1,
              borderRadius: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: { color: "rgb(156, 163, 175)" },
            },
          },
          scales: {
            x: {
              ticks: { color: "rgb(156, 163, 175)" },
              grid: { color: "rgba(156, 163, 175, 0.1)" },
            },
            y: {
              ticks: {
                color: "rgb(156, 163, 175)",
                callback: (value) =>
                  "$" + new Intl.NumberFormat("en-US").format(value as number),
              },
              grid: { color: "rgba(156, 163, 175, 0.1)" },
            },
          },
        },
      };
      revenueChartInstance = new ChartJS(revenueChart.value, revenueConfig);
    }

    if (breakdownChart.value) {
      const breakdownConfig: ChartConfiguration = {
        type: "doughnut",
        data: {
          labels: salesBreakdown.value.map((item) => item.category),
          datasets: [
            {
              data: salesBreakdown.value.map((item) => item.amount),
              backgroundColor: salesBreakdown.value.map((item) => item.color),
              borderWidth: 0,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.label || "";
                  const value =
                    "$" +
                    new Intl.NumberFormat("en-US").format(
                      context.parsed as number
                    );
                  return `${label}: ${value}`;
                },
              },
            },
          },
        },
      };
      breakdownChartInstance = new ChartJS(
        breakdownChart.value,
        breakdownConfig
      );
    }
  });
};

const destroyCharts = () => {
  if (revenueChartInstance) {
    revenueChartInstance.destroy();
    revenueChartInstance = null;
  }
  if (breakdownChartInstance) {
    breakdownChartInstance.destroy();
    breakdownChartInstance = null;
  }
};

watchEffect(() => {
  if (revenueChart.value && breakdownChart.value) {
    destroyCharts();
    initCharts();
  }
});

onUnmounted(() => {
  destroyCharts();
});
</script>

<template>
  <div class="p-6 bg-[#0d1117] min-h-screen">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-white mb-2">Dashboard</h1>
      <p class="text-gray-400">Welcome to the Cinema Admin Dashboard</p>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Total Revenue Card -->
      <div class="bg-[#161b22] border border-gray-700 rounded-lg p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-400 mb-1">Total Revenue</p>
            <p class="text-2xl font-bold text-white">
              {{ formatCurrency(dashboardData.totalRevenue) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Tickets Sold Card -->
      <div class="bg-[#161b22] border border-gray-700 rounded-lg p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-400 mb-1">Tickets Sold</p>
            <p class="text-2xl font-bold text-white">
              {{ dashboardData.ticketsSold }}
            </p>
          </div>
        </div>
      </div>

      <!-- F&B Sales Card -->
      <div class="bg-[#161b22] border border-gray-700 rounded-lg p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-400 mb-1">F&B Sales</p>
            <p class="text-2xl font-bold text-white">
              {{ formatCurrency(dashboardData.fnbSales) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Active Events Card -->
      <div class="bg-[#161b22] border border-gray-700 rounded-lg p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-400 mb-1">Active Events</p>
            <p class="text-2xl font-bold text-white">
              {{ dashboardData.activeEvents }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Revenue Over Time Chart -->
      <div class="bg-[#161b22] border border-gray-700 rounded-lg p-6">
        <h3 class="text-lg font-semibold text-white">Revenue Over Time</h3>
        <div class="relative h-64">
          <canvas ref="revenueChart" class="w-full h-full"></canvas>
        </div>
      </div>

      <!-- Sales Breakdown Chart -->
      <div class="bg-[#161b22] border border-gray-700 rounded-lg p-6">
        <h3 class="text-lg font-semibold text-white">Sales Breakdown</h3>
        <div class="relative h-64">
          <canvas ref="breakdownChart" class="w-full h-full"></canvas>
        </div>

        <!-- Legend -->
        <div class="flex justify-center mt-4 space-x-6">
          <div
            v-for="item in salesBreakdown"
            :key="item.category"
            class="flex items-center"
          >
            <div
              class="w-3 h-3 rounded-full mr-2"
              :style="{ backgroundColor: item.color }"
            ></div>
            <span class="text-sm text-gray-300">{{ item.category }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
