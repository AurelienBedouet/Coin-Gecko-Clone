import React from "react";
import ThemeToggle from "./ThemeToggle";
import { AiOutlineInstagram } from "react-icons/ai";
import { FaFacebookF, FaGithub, FaTiktok, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="rounded-div mt-8 pt-8 text-primary mb-2">
      <div className="grid md:grid-cols-2">
        {/*******************/}
        {/* START LEFT HALF */}
        {/*******************/}
        <div className="flex justify-evenly w-full md:max-w-[300px] uppercase">
          {/* Support */}
          <div>
            <h2 className="font-bold">Support</h2>
            <ul>
              <li className="text-sm py-2">Help Center</li>
              <li className="text-sm py-2">Contact Us</li>
              <li className="text-sm py-2">API Status</li>
              <li className="text-sm py-2">Documentation</li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h2 className="font-bold">Info</h2>
            <ul>
              <li className="text-sm py-2">About Us</li>
              <li className="text-sm py-2">Careers</li>
              <li className="text-sm py-2">Invest</li>
              <li className="text-sm py-2">Legal</li>
            </ul>
          </div>
        </div>
        {/*****************/}
        {/* END LEFT HALF */}
        {/*****************/}

        {/********************/}
        {/* START RIGHT HALF */}
        {/********************/}
        <div className="text-right">
          <div className="w-full flex justify-end">
            <div className="w-full md:w-[300px] py-4 relative">
              {/* Dark Theme Toggle Button */}
              <div className="flex justify-center md:justify-end py-4 md:py-0 md:pb-4 mt-[-1rem]">
                <ThemeToggle />
              </div>

              {/* NewsLetter */}
              <p className="text-center md:text-right">
                Sign up for crypto news
              </p>
              <div className="py-4">
                <form>
                  <input
                    className="bg-primary border border-input p-2 mr-2 w-full shadow-xl rounded-2xl md:w-auto"
                    type="email"
                    placeholder="Enter your email"
                  />
                  <button className="bg-button text-btnText px-4 py-2 w-full rounded-2xl shadow-xl hover:shadow-2xl md:w-auto my-2">
                    Send
                  </button>
                </form>
              </div>

              {/* Socials */}
              <div className="py-4 flex justify-around text-accent">
                <AiOutlineInstagram />
                <FaFacebookF />
                <FaGithub />
                <FaTiktok />
                <FaTwitter />
              </div>
            </div>
          </div>
        </div>
        {/******************/}
        {/* END RIGHT HALF */}
        {/******************/}
      </div>
      <p className="text-center py-4">
        Powered by{" "}
        <a
          className="text-accent"
          href="https://www.coingecko.com/"
          target="_blank"
        >
          Coin Gecko
        </a>
      </p>
    </footer>
  );
};

export default Footer;
