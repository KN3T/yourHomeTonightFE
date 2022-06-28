// import { useEffect, useLayoutEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import HotelCard from '../HotelCard/HotelCard'
// import CityPopulerList from '../CityPolulerList/CityPopulerList'

// const CityPolulerListShow = () => {
//   const dispatch = useDispatch()
//   const [show, setShow] = useState(4)

//   useEffect(() => {
//     dispatch(fetchBicycles())
//   }, [dispatch])

//   useLayoutEffect(() => {
//     window.addEventListener('resize', setSize)

//     return () => window.removeEventListener('resize', setSize)
//   }, [])

//   return (
//     <div className="mutli_trending">
//       <div
//         style={{
//           maxWidth: 1200,
//           marginLeft: 'auto',
//           marginRight: 'auto',
//           marginTop: 64,
//         }}
//       >
//         <CityPopulerList show={show}>

//         </CityPopulerList>
//       </div>
//     </div>
//   )
// }

// export default CityPolulerListShow
