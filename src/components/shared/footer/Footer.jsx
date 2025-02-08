import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="bg-[#10101e] ">
      <div className="">
        <h1 className="text-[#FFFFFF] font-crimson text-center pt-[45px] pb-[33px] text-[36px] font-bold">LawPair</h1>
        <div className="space-x-[30px] font-roboto text-[#FFFFFF] flex justify-center pb-[27px]">
          <a href="/">Home</a>
          <a href="/about">About Us</a>
          <a href="/disclaimer">Disclaimer</a>
          <a href="/legal-resources">Legal Resources</a>
        </div>
        <div className="space-x-[30px] text-[#FFFFFF] flex justify-center pb-[40px]">
          <a href=""><FaFacebook className="text-[36px]"/></a>
          <a href=""><FaInstagram className="text-[36px]"/></a>
          <a href=""><FaLinkedin className="text-[36px]"/></a>
          <a href=""><FaXTwitter className="text-[36px]"/></a>
        </div>
        <hr className="border-[#B6B6BA]"/>
        <div className="pt-[12px]">
          <p className="max-w-[1610px] mx-auto text-wrap px-4 font-roboto text-center text-[12px] text-[#B6B6BA] leading-[32px]"> Copyright © 2025, LawPair, LLC. The information provided on this website is not and should not be considered legal advice. No attorney-client relationship is formed by or  through use of this website. The attorney listings on this site may constitute attorney advertising. Use of this website constitutes acceptance of the LawPair Terms of Use.</p>
        </div>
      </div>
    </div>
  )
}

export default Footer