function About({ onBackToHome }) {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">About StyleHub</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your trusted destination for premium fashion and style
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            At StyleHub, we believe that fashion is more than just clothing—it's a form of self-expression.
            Our mission is to provide high-quality, stylish clothing that empowers individuals to express
            their unique personality and confidence.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            We are committed to offering a curated selection of men's and women's fashion that combines
            contemporary trends with timeless elegance, all while maintaining affordable prices and
            exceptional customer service.
          </p>
        </div>

        {/* Values Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Quality First</h3>
            <p className="text-gray-600">
              We source only the finest materials and work with trusted manufacturers to ensure
              every piece meets our high standards of quality and durability.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Affordable Prices</h3>
            <p className="text-gray-600">
              We believe great style shouldn't break the bank. Our direct-to-consumer model allows
              us to offer premium fashion at accessible prices.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Customer Focus</h3>
            <p className="text-gray-600">
              Your satisfaction is our priority. We're dedicated to providing exceptional customer
              service and a seamless shopping experience from browsing to delivery.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
          <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
            <p>
              StyleHub was founded in 2020 with a simple vision: to make premium fashion accessible to everyone.
              What started as a small online boutique has grown into a trusted fashion destination, serving
              thousands of customers worldwide.
            </p>
            <p>
              Our journey began when our founders noticed a gap in the market for high-quality, affordable
              fashion that didn't compromise on style or sustainability. We set out to create a brand that
              combines the latest trends with timeless designs, all while maintaining ethical production
              practices.
            </p>
            <p>
              Today, StyleHub continues to evolve, staying ahead of fashion trends while remaining true to
              our core values of quality, affordability, and customer satisfaction. We're proud to be your
              go-to destination for all your fashion needs.
            </p>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg shadow-lg p-8 text-white mb-12">
          <h2 className="text-3xl font-bold mb-6">Why Choose StyleHub?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <svg className="w-6 h-6 text-white flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <h3 className="font-semibold text-lg mb-1">Wide Selection</h3>
                <p className="text-primary-100">Extensive collection of men's and women's clothing</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <svg className="w-6 h-6 text-white flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <h3 className="font-semibold text-lg mb-1">Fast Shipping</h3>
                <p className="text-primary-100">Quick and reliable delivery to your doorstep</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <svg className="w-6 h-6 text-white flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <h3 className="font-semibold text-lg mb-1">Easy Returns</h3>
                <p className="text-primary-100">Hassle-free return policy within 30 days</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <svg className="w-6 h-6 text-white flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <h3 className="font-semibold text-lg mb-1">Secure Payment</h3>
                <p className="text-primary-100">Safe and encrypted payment processing</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Get in Touch</h2>
          <p className="text-gray-600 text-lg mb-6">
            Have questions or feedback? I'll love to hear from you! Contact me at the email below.
            <br />
            I created this website as a part of my Cursor learning journey where I learned to use Cursor to build this website.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-gray-700">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>karanvirsagar1998@gmail.com</span>
            </div>

          </div>
        </div>

        {/* Back Button */}
        <div className="text-center mt-12">
          <button
            onClick={onBackToHome}
            className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition duration-200 transform hover:scale-105"
          >
            Back to Shopping
          </button>
        </div>
      </div>
    </div>
  )
}

export default About

