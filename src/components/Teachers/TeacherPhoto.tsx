import React from "react";
import Image from "next/image";

interface TeacherPhotoProps {
    avatar_url: string;
    name: string;
    surname: string;
}

const TeacherPhoto: React.FC<TeacherPhotoProps> = ({ avatar_url, name, surname }) => (
    <div className="w-[100px] h-[100px] l:w-[120px] l:h-[120px] shrink-0 relative border-2 rounded-full border-secondary p-2 online">
        <Image
            src={avatar_url}
            alt={`${name} ${surname} photo`}
            width={120}
            height={120}
            className="rounded-full block"
            placeholder="blur"
            blurDataURL="/placeholder.jpg"
        />
    </div>
);

export default TeacherPhoto;
