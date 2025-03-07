// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";

// import menData from "../../public/menData.json";
// import womenData from "../../public/imagesData.json";
// import kidsData from "../../public/kidsData.json";

// const SearchResults = () => {
//   const location = useLocation();
//   const query = new URLSearchParams(location.search).get("q");
//   const [searchResults, setSearchResults] = useState([]);

//   useEffect(() => {
//     if (query) {
//       // Combine all product data
//       const allProducts = [
//         ...menData.products.MEN.SHIRTS || [],
//         ...menData.products.MEN.JACKETS || [],
//         ...womenData.products.WOMEN.TOPS || [],
//         ...womenData.products.WOMEN.DRESSES || [],
//         ...kidsData.products.KIDS.BABYWEAR || []
//       ];

//       // Filter products based on search query and category
//       const filteredProducts = allProducts.filter(product => {
//         const isCategoryMatch = product.category?.toLowerCase() === categoryQuery?.toLowerCase();




//         product?.product_name?.toLowerCase()?.includes(query?.toLowerCase()) || 
//         isCategoryMatch || // Check for category match
//         (product?.product_name?.toLowerCase() === "kurta") || // Match for Kurtas

       


//         (product?.product_name?.toLowerCase() === "kurta") || // Match for Kurtas
//         (product?.product_name?.toLowerCase() === "top") || // Match for Tops
//         (product?.product_name?.toLowerCase() === "dress") || // Match for Dresses
//         (product?.product_name?.toLowerCase() === "bottom") || // Match for Bottoms
//         (product?.product_name?.toLowerCase() === "shirt") || // Match for Shirts
//         (product?.product_name?.toLowerCase() === "t-shirt") // Match for T-shirts
//       );



//       const categoryQuery = new URLSearchParams(location.search).get("category");
//       const finalResults = filteredProducts.filter(product => 
//         !categoryQuery || product.category?.toLowerCase() === categoryQuery.toLowerCase()
//       );


//       setSearchResults(finalResults);

//     }
//   }, [query]);

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6">Search Results for "{query}"</h1>
//       {searchResults.length > 0 ? (
//         <div className="grid grid-cols-3 gap-4">
//           {searchResults.map(product => (
//             <div key={product.id} className="border p-4">
//               <img src={product.image} alt={product.product_name} className="w-full h-auto" />
//               <h2 className="text-lg font-semibold">{product.product_name}</h2>
//               <p className="text-gray-600">{product.description}</p>
//               <p className="text-xl font-bold">${product.new_price}</p>
//             </div>
//           ))}
//         </div>


//       ) : (
//         <div className="text-center py-8">
//           <p className="text-gray-600 mb-4">No results found for "{query}"</p>
//           <p className="text-sm text-gray-500">Try searching for something else</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchResults;
