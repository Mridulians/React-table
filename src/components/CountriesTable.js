import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'

const CountriesTable = () => {

  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  const getCountries = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v2/all")
      setCountries(response.data);
      setFilteredCountries(response.data);
    } catch (error) {
      console.log(error)
    }
  };

  const column = [
    {
      name: "Country Name",
      selector: (row) => row.name,
      sortable: true,
    },

    {
      name: "Country Native Name",
      selector: (row) => row.nativeName,

    },

    {
      name: "Country Capital",
      selector: (row) => row.capital,

    },

    {
      name: "Country Flag",
      selector: (row) => <img width={50} height={50} src={row.flag} alt="" />,
    },

    {
      name: "Region",
      cell: (row) => (
        <button className='btn btn-primary' onClick={() => alert(row.region)}>Region</button>

      ),
    },

    {
      name: "Population",
      cell: (row) => (
        <button className='btn btn-danger' onClick={() => alert(row.population)}>Population</button>
      ),
    },
  ];


  useEffect(() => {
    getCountries();
     // eslint-disable-next-line 
  }, []);


  useEffect(() => {
    const result = countries.filter((country) => {
      return country.name.toLowerCase().match(search.toLowerCase());
    });
    setFilteredCountries(result);
     // eslint-disable-next-line 
  }, [search]);


  return (
    <DataTable title="Country List" columns={column} data={filteredCountries} pagination fixedHeader fixedHeaderScrollHeight='450px' selectableRows selectableRowsHighlight highlightOnHover subHeader subHeaderComponent={<input type="text" placeholder='Search Here' className=' w-25 form-control' value={search}  onChange ={(e) => setSearch(e.target.value)} />} />
  )
}

export default CountriesTable