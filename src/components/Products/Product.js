import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Button from '../Reusable-Components/Button';
import { useAuthContext } from '../../Context/AuthContextProvider';
import { useShopContext } from '../../Context/ShopContextProvider';
import { Link } from 'react-router-dom';
function Product({lap}) {   
    const {User} = useAuthContext();
  const {addToCart,cartItems,addToFav,FavItems,removeFromFav,deleteItemFromCart,dispatch} = useShopContext();
  const itemAmount = cartItems[lap.id];


    const notify = (msg) => toast.error(msg, {
        position: "top-center"
      });
      const notifySuc = (msg) => toast.success(msg, {
        position: "top-center"
      });
      const notifyWarn = (msg) => toast.warn(msg, {
        position: "top-center"
      });

    function handleAddToCart(id,model){
      if(User === null){
        notify("You Don't Have Account!")
      } else if(itemAmount > 0){
        deleteItemFromCart(id);
        notifyWarn(`you removed ${model} from cart`)
      }

      else{
        addToCart(id);
        notifySuc(`You have added ${model} to Cart`);
      }
    }
    function handleAddToFav(itemId,img,brand,model,processor,ram,storage,graphicCard){
      if(User === null){
        notify("You Don't Have Account!")
      }
      else if(FavItems.some(item=>item.itemId == itemId)){
        removeFromFav(itemId);
        notifyWarn(`you removed ${model} form Favorite List!`)
      }
      else{
        addToFav(itemId,img,brand,model,processor,ram,storage,graphicCard);
        notifySuc(`You have added ${model} to Favorites`);
      }
    }
  return (
    <li className='col-12 col-md-6 col-lg-4 text-center text-md-start'>
    <Link to={`${lap.id}`} style={{textDecoration:"none"}}> 
    <div className='imageWrapper'>
        <img width="100%" src={lap.image}/>
    </div>
    <div className='details p-2'>
    <p className='laptopName'>{lap.brand}</p>
    <p className='desc'>{lap.model} {lap.processor} {lap.ram} {lap.display_size} {lap.storage}</p>
    <p className='price'>{lap.price}$</p>
    </div>
    </Link>
    <button className='btn-abs' onClick={()=>handleAddToFav(lap.id,lap.image,lap.brand,lap.model,lap.processor,lap.ram,lap.storage,lap.graphics_card)}>{FavItems.some(item=>item.itemId == lap.id)?<FavoriteIcon/> :<FavoriteBorderOutlinedIcon/> }</button>
    <button onClick={()=> handleAddToCart(lap.id,lap.model)} className='btn-abs'>{itemAmount > 0 ? <ShoppingCartIcon/> : <ShoppingCartOutlinedIcon/>}</button>
    
   
</li>
  )
}

export default Product
