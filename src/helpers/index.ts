export const maskedMoney = (value: number | string, emptyValue?: any) => {
    if (value) {
      return Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(Number(value));
    }
    return emptyValue || "0";
};

export const convertJsonToFormData = (data: any) => {
  var form_data = new FormData();

  for (var key in data) {
    if (key !== 'id'){
      form_data.append(key, data[key]);
    } 
  }

  return form_data;
};
