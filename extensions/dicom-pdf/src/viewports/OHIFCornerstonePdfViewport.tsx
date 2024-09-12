import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function OHIFCornerstonePdfViewport({ displaySets }) {
  const [url, setUrl] = useState(null);

  if (displaySets && displaySets.length > 1) {
    throw new Error(
      'OHIFCornerstonePdfViewport: only one display set is supported for dicom pdf right now'
    );
  }

  const { pdfUrl } = displaySets[0];

  useEffect(() => {
    const load = async () => {
      setUrl(await pdfUrl);
    };

    load();
  }, [pdfUrl]);

  return (
    <div className="bg-primary-black flex h-full w-full flex-col text-white">
      <div className="mx-auto">
        <a
          href={url}
          className="inline-flex items-center rounded bg-gray-300 py-2 px-4 font-bold text-gray-800 hover:bg-gray-400"
          role="button"
          download
        >
          <svg
            className="mr-2 h-4 w-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
          </svg>
          <span>Download PDF</span>
        </a>
      </div>
      <object
        data={url}
        type="application/pdf"
        className="h-full w-full"
      >
        <div>No online PDF viewer installed</div>
      </object>
    </div>
  );
}

OHIFCornerstonePdfViewport.propTypes = {
  displaySets: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default OHIFCornerstonePdfViewport;
