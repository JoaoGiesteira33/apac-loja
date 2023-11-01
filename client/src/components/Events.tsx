

export function Events({ events }: { events: Array<any>}) {
  return (
    <ul>
    {
      events.map((event: any, index: any) =>
        <li key={ index }>{ event }</li>
      )
    }
    </ul>
  );
}