import React from "react";
import "./Home.css";
import Product from "./Product";
import Stock from "./Stock";
import axios from "axios";
import { useEffect, useState } from "react";
function Home() {
  const [productData, setProductData] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [loginInfo, setLoginInfo] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    axios.get("http://localhost:5000/allproducts").then((res) => {
      console.log("result :", res.data);
      setProductData(res.data);
    });

    axios.get("http://localhost:5000/loginInfo").then((res) => {
      let val = res.data;
      if (val.length > 0) {
        setIsLogin(true);
        setLoginInfo(val);
        if (val[0].type == "Admin") setIsAdmin(true);
      }
    });
  }, []);
  return (
    <div className="home">
      {!isAdmin && (
        <section className="about" id="about">
          <div className="content">
            <span>Why Choose Us?</span>
            <h3>Makeup Makes Difference</h3>
            <p>
              Lavish represents a solid, new account in beauty, one that lifts
              up all outflows of independence with a wide range of Sustainable,
              Organic, Vegan and Non-toxic products.
            </p>
          </div>
          <img
            src="https://image.cnbcfm.com/api/v1/image/105536843-1540823030975huda-kattan-photo.jpg?v=1540823204&w=1920&h=1080"
            alt=""
          />
        </section>
      )}

      {!isAdmin && (
        <div class="heading">
          <h3>Featured Products</h3>
        </div>
      )}
      {!isAdmin && (
        <section className="category">
          <a href="#" className="categorybox">
            <img
              className="categoryBoxImg"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSBEwNwfmR1gpKFCvw1QOLs2yf4eQ0N-efPw&usqp=CAU"
              alt=""
            />
            <p>cosmetics</p>
          </a>

          <a href="#" className="categorybox">
            <img
              className="categoryBoxImg"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeXFTrZ-6wLZxHLow8sLuNrZdjAkrTyXWTsw&usqp=CAU"
              alt=""
            />
            <p>makeup</p>
          </a>

          <a href="#" className="categorybox">
            <img
              className="categoryBoxImg"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQMFqjztHsP9euR1tS2m1dQcKvATYV7UZ25A&usqp=CAU"
              alt=""
            />
            <p>powder</p>
          </a>

          <a href="#" className="categorybox">
            <img
              className="categoryBoxImg"
              src="https://i.pinimg.com/474x/c0/57/77/c05777235c8d47cbf1f1a9dce5cb5e51.jpg"
              alt=""
            />
            <p>lotions</p>
          </a>

          <a href="#" className="categorybox">
            <img
              className="categoryBoxImg"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ9A_ArGVH_lQBZsDJE8Ze8nr6L7kXVM8iLKwOTs8ZaU8VkJ0&s"
              alt=""
            />
            <p>lipstick</p>
          </a>

          <a href="#" className="categorybox">
            <img
              className="categoryBoxImg"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7WRJZvj-DpbU3yAbt49mENzbFV-6gxSNeX34DaHANmfFHg5A&s"
              alt=""
            />
            <p>mascara</p>
          </a>
        </section>
      )}

      <div className="home__container white">
        {isAdmin ? (
          <div class="heading white">
            <h3>Products</h3>
          </div>
        ) : (
          <div class="heading white">
            <h3>Shop Now</h3>
          </div>
        )}

        <div className="home__row">
          {/* <Product
            id="12321341"
            title="Lavish special Mist"
            price={11.96}
            rating={5}
            image="https://alwayscleia.com/wp-content/uploads/2019/02/Fourth-Ray-Beauty-Review.jpg"
          /> */}

          {productData == null ? (
            <h1>Loading...</h1>
          ) : (
            <>
              {productData.length == 0 ? (
                <h1>Empty</h1>
              ) : (
                <>
                  {productData.map((item) => (
                    <>
                      <Product
                        id={item._id}
                        title={item.title}
                        price={item.price}
                        rating={item.rating}
                        image={item.image}
                      />
                    </>
                  ))}
                </>
              )}
            </>
          )}
        </div>
        {isAdmin && (
          <div className="heading">
            <a href="/addProduct">
              <h1 className="home_product_btn">Add Product</h1>
            </a>
          </div>
        )}
      </div>

      {!isAdmin && (
        <section class="gallery" id="gallery">
          <div class="heading">
            <h3>Our Gallery</h3>
          </div>

          <div class="lightbox">
            <a href="https://cdn2.stylecraze.com/wp-content/uploads/2012/12/How-To-Wear-Red-Lipstick-3.jpg">
              <img
                src="https://cdn2.stylecraze.com/wp-content/uploads/2012/12/How-To-Wear-Red-Lipstick-3.jpg"
                alt=""
              />
            </a>
            <a href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsN11SOLqaO1GDeaOa8FKJIJfo1Zd570lg5yczHnYmuGBQCJANPD9LilJD49K4-mPK8Do&usqp=CAU">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsN11SOLqaO1GDeaOa8FKJIJfo1Zd570lg5yczHnYmuGBQCJANPD9LilJD49K4-mPK8Do&usqp=CAU"
                alt=""
              />
            </a>
            <a href="https://i.pinimg.com/originals/05/91/a6/0591a6a296d1e7384755e41561db30fb.jpg">
              <img
                src="https://i.pinimg.com/originals/05/91/a6/0591a6a296d1e7384755e41561db30fb.jpg"
                alt=""
              />
            </a>
            <a href="https://previews.123rf.com/images/gritsiv/gritsiv1906/gritsiv190600172/125033915-makeup-artist-work-in-her-beauty-studio-woman-applying-by-professional-make-up-master-beautiful-make.jpg">
              <img
                src="https://previews.123rf.com/images/gritsiv/gritsiv1906/gritsiv190600172/125033915-makeup-artist-work-in-her-beauty-studio-woman-applying-by-professional-make-up-master-beautiful-make.jpg"
                alt=""
              />
            </a>
            <a href="https://w0.peakpx.com/wallpaper/821/258/HD-wallpaper-sean-archer-bogdana-brunette-portrait-display-graphy-blue-eyes-pink-lipstick-women-looking-at-viewer-model-women-with-glasses-simple-background-black-hair-bogdana-kadritskaya-russian-women.jpg">
              <img
                src="https://w0.peakpx.com/wallpaper/821/258/HD-wallpaper-sean-archer-bogdana-brunette-portrait-display-graphy-blue-eyes-pink-lipstick-women-looking-at-viewer-model-women-with-glasses-simple-background-black-hair-bogdana-kadritskaya-russian-women.jpg"
                alt=""
              />
            </a>
            <a href="https://lovehairstyles.com/wp-content/uploads/2018/06/hair-bun-for-short-hair-ideas-low-1-683x1024.jpg">
              <img
                src="https://lovehairstyles.com/wp-content/uploads/2018/06/hair-bun-for-short-hair-ideas-low-1-683x1024.jpg"
                alt=""
              />
            </a>
          </div>
        </section>
      )}

      {isAdmin && (
        <section className="Orders">
          <div className="heading">
            <h3>Orders</h3>
          </div>
        </section>
      )}

      {!isAdmin && (
        <section class="team" id="team">
          <div class="heading">
            <h3>Our Team</h3>
            <p>
              Our team of industry experts overlook the whole process, providing
              the best experience to our customers.
            </p>
          </div>

          <div class="box-container">
            <div class="box">
              <div class="image">
                <img
                  src="https://cdn0.weddingwire.in/article/3433/original/1280/jpg/43343-list-of-famous-makeup-artists-meenakshidutt-red.jpeg"
                  alt=""
                />
                <div class="share">
                  <a href="#" class="fab fa-facebook-f"></a>
                  <a href="#" class="fab fa-twitter"></a>
                  <a href="#" class="fab fa-instagram"></a>
                  <a href="#" class="fab fa-linkedin"></a>
                </div>
              </div>
              <div class="content">
                <h3>meenakshi dutt</h3>
                <p>make-up artist</p>
              </div>
            </div>

            <div class="box">
              <div class="image">
                <img
                  src="https://images.squarespace-cdn.com/content/57684775f5e231994aa4807a/1520621000343-980XTIAT0S01GBPZSFY9/IMG_7653.JPG?content-type=image%2Fjpeg"
                  alt=""
                />
                <div class="share">
                  <a href="#" class="fab fa-facebook-f"></a>
                  <a href="#" class="fab fa-twitter"></a>
                  <a href="#" class="fab fa-instagram"></a>
                  <a href="#" class="fab fa-linkedin"></a>
                </div>
              </div>
              <div class="content">
                <h3>Daniel Sandler</h3>
                <p>make-up artist</p>
              </div>
            </div>

            <div class="box">
              <div class="image">
                <img
                  src="https://www.bringitonline.in/uploads/2/2/4/5/22456530/dsc01047_orig.jpg"
                  alt=""
                />
                <div class="share">
                  <a href="#" class="fab fa-facebook-f"></a>
                  <a href="#" class="fab fa-twitter"></a>
                  <a href="#" class="fab fa-instagram"></a>
                  <a href="#" class="fab fa-linkedin"></a>
                </div>
              </div>
              <div class="content">
                <h3>sana shaikh</h3>
                <p>make-up artist</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* <!-- service section starts  --> */}
      {!isAdmin && (
        <div class="heading">
          <h3>What can you expect?</h3>
        </div>
      )}
      {!isAdmin && (
        <section class="service">
          <div class="box">
            <img
              src="https://e7.pngegg.com/pngimages/671/17/png-clipart-product-logo-cargo-ship-free-shipping-furniture-text.png"
              alt=""
            />
            <h3>free shipping</h3>
            <p>
              Lavish provides shipping to all our prime members and orders above
              999/- free of cost.
            </p>
          </div>

          <div class="box">
            <img
              src="https://thumbs.dreamstime.com/b/secure-payment-icon-trendy-modern-flat-linear-vector-pay-white-background-thin-line-internet-security-networking-130953666.jpg"
              alt=""
            />
            <h3>secure payment</h3>
            <p>
              We provide secure payment services using state of the art
              encryption technology.
            </p>
          </div>

          <div class="box">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMfwl5dXlOE7jTfa7A5PJxdZUQyuket4-sGVa48C9OLav3FJbc9qu2bra3iNZE9wgX5uI&usqp=CAU"
              alt=""
            />
            <h3>24x7 support</h3>
            <p>
              With 40+ service centers across the world. Lavish provides 24x7
              customer service.
            </p>
          </div>
        </section>
      )}

      <section class="footer">
        <div class="box-container">
          <div class="box">
            <h3>Quick Links</h3>
            <a class="link" href="#home">
              <i class="fas fa-angle-right"></i> home
            </a>
            <a class="link" href="#gallery">
              <i class="fas fa-angle-right"></i> gallery
            </a>
            <a class="link" href="#team">
              <i class="fas fa-angle-right"></i> team
            </a>
          </div>

          <div class="box">
            <h3>Contact Info</h3>
            <p>
              <i class="fas fa-phone"></i> +91 98XXXXXX90
            </p>
            <p>
              <i class="fas fa-envelope"></i> poojasulodha560@gmail.com
            </p>
            <p>
              <i class="fas fa-map"></i> Delhi, india - 110041
            </p>
          </div>
          <div class="box">
            <h3>Explore Us</h3>
            <div class="share">
              <a href="#" class="fab fa-facebook-f"></a>
              <a href="#" class="fab fa-twitter"></a>
              <a href="#" class="fab fa-instagram"></a>
              <a href="#" class="fab fa-linkedin"></a>
            </div>
          </div>
        </div>

        <div class="credit">
          created by <span>Pooja Yadav </span> | all rights reserved!
        </div>
      </section>
    </div>
  );
}

export default Home;
