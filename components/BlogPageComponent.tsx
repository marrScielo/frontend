import BlogAside from "./blogaside";

import {ScrollShadow} from "@heroui/react";
import BlogPreview from "./blogpreview";

export default function BlogPageComponent() {
  return (
    <div className="flex justify-center text-[#634AE2]">
      <div className="w-full max-w-7xl px-4"> {/* Adds max-width and padding */}
        <h1 className="text-start py-5 text-3xl leading-10 font-bold">Blog</h1>

        <div className="flex justify-center pb-20">
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-2">
            <ScrollShadow hideScrollBar className=" h-[870px]">
              <BlogPreview />
              <BlogPreview />
              <BlogPreview />
              <BlogPreview />
              <BlogPreview />
              <BlogPreview />
              <BlogPreview />
              </ScrollShadow>
            </div>

            <div className="col-span-1">
      
              <div className="my-2 md:my-4 border-l-[0.5px] border-[#634AE2]" >
              
              <BlogAside />
              </div>

     
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}