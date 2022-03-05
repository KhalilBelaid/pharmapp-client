/**
 * @type {Prescription[]}
 */
 let prescriptions = [
    {
      name: "Anonymous1",
      number: 1995,
      img: ""
    },
    {
      name: "Anonymous2",
      number: 2000,
      img: ""
    },
    {
      name: "Anonymous3",
      number: 2003,
      img: ""
    },
    {
      name: "Anonymous4",
      number: 1997,
      img: ""
    },
    {
      name: "Anonymous5",
      number: 1998,
      img: ""
    }
  ];
  
  export function getPrescriptions() {
    return prescriptions;
  }
  
  /**
   * @param {number} number
   * @returns {Prescription}
   */
  export function getPrescription(number: Number) {
    return prescriptions.find(prescription => prescription.number === number) ?? {
      name: "Not found",
      number: 0,
      img: ""
    };
  }
  
  /**
   * @typedef {{ name: string; number: number; img: string;}} Prescription
   */  