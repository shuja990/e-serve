import React from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon,
    EmailShareButton,
    EmailIcon
  } from "react-share";

function PostShare({handleShare}) {
    const shareUrl= window.location.href;
    const ShareSocialItem=({Button, Icon, socialType})=>{
        return(
            <div className="shareSocialItem m-2">
                <Button
            url={shareUrl}
            quote={`title`}
            className=""
            onClick={()=> handleShare(socialType)}
          >
            <Icon size={32} round />
          </Button>
                </div>
        )
    }
    
  return (
    <div style={{display: 'flex'}} className='postShare flex-row'>
          
  
    <ShareSocialItem Button= {FacebookShareButton} Icon={FacebookIcon} socialType='fb' />
        
    <ShareSocialItem Button= {TwitterShareButton} Icon={TwitterIcon} socialType='twitter' />
    <ShareSocialItem Button= {WhatsappShareButton} Icon={WhatsappIcon} socialType='whatsapp' />
    <ShareSocialItem Button= {EmailShareButton} Icon={EmailIcon} socialType='email' />
           
    </div>
  )
}

export default PostShare