import React, { Fragment } from "react";

const members = [
  {
    name: "Nguyễn Minh Anh",
    avatar: "https://z-p3-scontent.fhan8-1.fna.fbcdn.net/v/t1.15752-9/379343939_761660745719035_7748122253978598527_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=ae9488&_nc_ohc=crtijibymHMAX9SKPMy&_nc_ht=z-p3-scontent.fhan8-1.fna&oh=03_AdQKGmpBp2M5lHUFWTVsyty8VZeGWISNFoy2YFPQ4_ffvQ&oe=6535E0C3",
    msv: "2520230049",
    email: "xxx.mah00.1@gmail.com",
  },
  {
    name: "Nguyễn Đăng Hoà",
    avatar: "https://z-p3-scontent.fhan8-1.fna.fbcdn.net/v/t1.15752-9/381254486_1353729198889967_6764637142701603856_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=ae9488&_nc_ohc=sr5sWDyV_X8AX8CKg98&_nc_ht=z-p3-scontent.fhan8-1.fna&oh=03_AdQF2Puc686lEcT_N-p58nvwOn9vRx_VRH4cz9uIoZI0-w&oe=6535F682",
    msv: "2520220048",
    email: "khubuisim@gmail.com",
  },
  {
    name: "Nguyễn Tuấn Anh",
    avatar:"https://z-p3-scontent.fhan8-1.fna.fbcdn.net/v/t1.15752-9/381297097_619104716794085_8021725525823754283_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=ae9488&_nc_ohc=4z9iNlqr_9AAX94gUyF&_nc_ht=z-p3-scontent.fhan8-1.fna&oh=03_AdT7rZFZe4N2yV9M4coRIzDUEtJSOyIQ_3oYHpe1HmclMA&oe=6535EA58",
    msv: "2520230146",
    email: "ta392002@gmail.com",
  },
  {
    name: "Nguyễn Đức",
    avatar:"https://z-p3-scontent.fhan8-1.fna.fbcdn.net/v/t1.15752-9/381244402_1054682345539683_8770865088691305126_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=ae9488&_nc_ohc=G04PNQt32GsAX93wijf&_nc_ht=z-p3-scontent.fhan8-1.fna&oh=03_AdTxC-gbNqWdsJ6_nMTQ4BoyFiRSRWsftzDv3_zRcTQbmw&oe=6535EC7D",
    msv: "2520215169",
    email: "ducnk43@gmail.com",
  },
];

const IntroductionPage = () => {

  document.title = "Giới thiệu - ABook";

  return (
    <Fragment>
      <div className="container my-20">
        <h1 className="text-4xl font-semibold text-text2 relative after:absolute after:w-[40%] after:bg-text2 after:h-[2px] after:bottom-0 after:left-0 inline-block">
          Giới thiệu
        </h1>
        <div className="my-10">
          <div className="my-10">
            <h1 className="text-2xl font-semibold text-text2 relative after:absolute after:w-[40%] after:bg-text2 after:h-[2px] after:bottom-0 after:left-0 inline-block">
              Giới thiệu về dự án
            </h1>
            <div className="my-10">
              <p className="text-text3">
                Trong thời đại công nghệ số phát triển như hiện nay, việc mua
                sắm trực tuyến ngày càng trở nên phổ biến và tiện lợi hơn. Với
                mục tiêu cung cấp các sản phẩm sách đa dạng và chất lượng cao
                cho khách hàng, chúng tôi quyết định xây dựng một website bán
                sách trực tuyến. Dự án sẽ tập trung vào việc thiết kế giao diện
                dễ sử dụng và thu hút khách hàng, cùng với hệ thống quản lý đơn
                hàng và thanh toán đơn giản và an toàn. Để đảm bảo chất lượng
                sản phẩm sách, chúng tôi sẽ liên kết với các nhà xuất bản uy tín
                và chọn lọc các đầu sách chất lượng để đưa vào bán hàng trên
                website. Ngoài ra, dự án còn đặc biệt quan tâm đến khía cạnh bảo
                mật thông tin khách hàng và dữ liệu, bằng cách áp dụng các biện
                pháp an ninh thông tin tiên tiến và đảm bảo tuân thủ các quy
                định về bảo vệ thông tin cá nhân. Chúng tôi hy vọng rằng dự án
                này sẽ đem lại sự hài lòng và tin tưởng từ phía khách hàng, đồng
                thời cũng mang lại lợi ích kinh tế cho doanh nghiệp.
              </p>
            </div>
          </div>
          <div className="my-10">
            <h1 className="text-2xl font-semibold text-text2 relative after:absolute after:w-[40%] after:bg-text2 after:h-[2px] after:bottom-0 after:left-0 inline-block">
              Thành viên nhóm
            </h1>
            <div className="my-10">
              <div className="flex gap-10">
                <div className="flex gap-5 flex-col">
                  {members.map((member, index) => (
                    <div className="flex gap-5" key={index}>
                      <div className="w-20 h-20 rounded-full bg-gray-200">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="text-text2 font-semibold">
                          {member.name}
                        </p>
                        <p className="text-text3">MSSV: {member.mssv}</p>
                        <p className="text-text3">
                          Email:{" "}
                          <a
                            href={`mailto:${member.email}`}
                            className="text-text2 font-medium"
                          >
                            {member.email}
                          </a>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default IntroductionPage;
