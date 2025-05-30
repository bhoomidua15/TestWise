import React from 'react'

function Footer() {
  return (
    <>
    <footer className="bg-gray-900 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">TestWise 2025</h3>
              <p className="text-gray-400">Revolutionizing assessments across space and time.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Quantum Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400 transition duration-300">Multiverse Home</a></li>
                <li><a href="#" className="hover:text-blue-400 transition duration-300">Temporal About</a></li>
                <li><a href="#" className="hover:text-blue-400 transition duration-300">Hyperdimensional Features</a></li>
                <li><a href="#" className="hover:text-blue-400 transition duration-300">Subspace Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Connect Across Dimensions</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-2xl hover:text-blue-400 transition duration-300">
                  <i className="fab fa-interdimensional-facebook"></i>
                </a>
                <a href="#" className="text-2xl hover:text-blue-400 transition duration-300">
                  <i className="fab fa-quantum-twitter"></i>
                </a>
                <a href="#" className="text-2xl hover:text-blue-400 transition duration-300">
                  <i className="fab fa-neural-linkedin"></i>
                </a>
                <a href="#" className="text-2xl hover:text-blue-400 transition duration-300">
                  <i className="fab fa-holographic-instagram"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p>&copy; 2025 ExamPro. All rights reserved across all known and unknown dimensions.</p>
          </div>
        </div>
      </footer>
      
    </>
  )
}

export default Footer
