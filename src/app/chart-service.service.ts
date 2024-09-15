import { IVideo } from './core/Interface/IVideo';
import { IUser } from './core/Interface/IUsers';
import { Injectable } from '@angular/core';
import { AgChartOptions } from 'ag-charts-community';
import { ICourse } from './core/Interface/ICourse';


@Injectable({
  providedIn: 'root'
})
export class ChartServiceService {
  constructor() {}

  // Chart 1
  generateChart1(userData: IUser[]): AgChartOptions {
    const monthlyData = this.groupUsersByMonth(userData);

    return {
      data: monthlyData,
      series: [{ type: 'line', xKey: 'month', yKey: 'userCount' }],
      axes: [
        { type: 'category', position: 'bottom', title: { text: 'Month' } },
        { type: 'number', position: 'left', title: { text: 'User Count' } }
      ]
    };
  }

  // Method to group users by month based on the createdDate
  private groupUsersByMonth(userData: IUser[]): { month: string, userCount: number }[] {
    const monthMap: { [key: string]: number } = {};

    userData.forEach(user => {
      const createdDate = new Date(user.createdDate);
      const month = createdDate.toLocaleString('default', { month: 'short', year: 'numeric' });

      if (monthMap[month]) {
        monthMap[month]++;
      } else {
        monthMap[month] = 1;
      }
    });

    return Object.keys(monthMap).map(month => ({
      month,
      userCount: monthMap[month]
    }));
  }

  // Chart 2 Pie
  generatePieChart2(userData: IUser[]): AgChartOptions {
    const monthlyData = this.groupUsersByMonth(userData);
  
    return {
      data: monthlyData,
      series: [
        {
          type: 'pie',
          angleKey: 'userCount',   // Represents the size of each pie slice
          calloutLabelKey: 'month', // Represents the label on the slices (month names)
          sectorLabelKey: 'userCount', // Displays the user count on each slice
          sectorLabel: {
            color: 'white',       // Color of the sector label
            fontWeight: 'bold',   // Bold text for the label
          },
        },
      ],
    };
  }

  // Chart3 Donut
  generateDonutChart3(courses: ICourse[]): AgChartOptions {
    // Aggregate videos by month
    const monthlyData = this.groupCoursesByMonth(courses);
  
    return {
      data: monthlyData,
      series: [
        {
          type: 'donut',
          calloutLabelKey: 'month',  // Month as the label
          angleKey: 'count',         // Number of uploads in each month
          innerRadiusRatio: 0.7,     // Donut inner radius
        },
      ],
    };
  }

 // Method to group courses by month based on the createdDate
private groupCoursesByMonth(courses: any[]): { month: string, count: number }[] {
  const monthMap: { [key: string]: number } = {};

  courses.forEach(course => {
    const createdDate = new Date(course.createdDate);
    const month = createdDate.toLocaleString('default', { month: 'short', year: 'numeric' });

    if (monthMap[month]) {
      monthMap[month]++;
    } else {
      monthMap[month] = 1;
    }
  });

  return Object.keys(monthMap).map(month => ({
    month,
    count: monthMap[month]
  }));
}


  
 

  // Chart4 Bar
  generateBarChart4(videos: IVideo[]): AgChartOptions {
    return {
      data: videos,
      series: [
        { type: 'bar', xKey: 'videoTitle', yKey: 'videoId', yName: 'Video ID' },       // Bar for video ID
        { type: 'bar', xKey: 'videoTitle', yKey: 'totalDuration', yName: 'Duration' },  // Bar for video duration
      ],
      axes: [
        { type: 'category', position: 'bottom', title: { text: 'Video Title' } },       // x-axis for video titles
        { type: 'number', position: 'left', title: { text: 'Values' } },                // y-axis for values
      ],
    };
  }
  
  
}
