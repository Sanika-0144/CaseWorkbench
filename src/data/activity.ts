export interface ActivityItem {
  id: string;
  time: string;
  text: string;
}

export const recentChanges: ActivityItem[] = [
  {
    id: "adt-olivia",
    time: "7:41 AM",
    text: "New ADT event received 7:41 AM for Olivia Chen – identity unconfirmed",
  },
  {
    id: "dc-eleanor",
    time: "6:12 AM",
    text: "Discharge received for Eleanor Brooks. Event time and received time differ.",
  },
  {
    id: "rx-marcus",
    time: "5:48 AM",
    text: "Refill rejection on file for Marcus Reed – prior authorisation.",
  },
  {
    id: "visit-priya",
    time: "Yesterday",
    text: "Priya Shah prenatal visit is Tue 10 Nov at 9:30. Transport is still unresolved.",
  },
];
