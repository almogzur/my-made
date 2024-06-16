* style dialog
* add top style component to layout 
* vendor api
* aside component 
*   fix dates so can select same or smaller dates
function compareDatesSafe(d1, d2) {
  const date1 = new Date(d1);
  const date2 = new Date(d2);

  if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
      return 'One or both of the dates are invalid';
  }
  if (date1 < date2) {
      return 'date1 is before date2';
  } else if (date1 > date2) {
      return 'date1 is after date2';
  } else {
      return 'date1 is equal to date2';
  }
}
*