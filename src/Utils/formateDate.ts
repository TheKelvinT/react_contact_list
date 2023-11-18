export const formatDate = (dateString: any, time: boolean = true) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    const optionsTime: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };

    const date = new Date(dateString);
    const formattedDate: string = date.toLocaleDateString("en-GB", options);
    const formattedTime: string = date.toLocaleTimeString("en-GB", optionsTime);

    if(time){
      return `${formattedDate} ${formattedTime}`;

    } else {
      return `${formattedDate}`;

    }
  };

  