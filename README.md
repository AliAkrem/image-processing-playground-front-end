# Image Processing Playground

A React-based web application that demonstrates various image processing techniques and filters. This interactive tool allows users to upload images and apply different image processing operations.


![output](https://github.com/user-attachments/assets/a06a4b46-f71a-4725-9365-b31e2755d6f7)


## Features
- Noise Addition:
  - Gaussian Noise with configurable sigma parameter
  - Salt & Pepper Noise
- Enhancement Filters:
  - Dynamics reframing (v1)

  <img src="resources/Screenshot from 2024-12-17 13-42-53.png" /> 

  - Contrast enhancement (v2)
  
  <img src="resources/Screenshot from 2024-12-17 13-43-19.png"   />
  <img src="resources/Screenshot from 2024-12-17 13-43-36.png"   />

- Spatial Filters:
  - Gaussian Filter with adjustable filter size
  - Average Filter
  - Minimum Filter
  - Maximum Filter
  - Median Filter
  - Nagao Filter
- Edge Detection:
  - Prewitt Edge Detection

## Configuration Options

The application provides various parameters that can be adjusted:
- Sigma value (0.0 - 1.0) for Gaussian operations
- Filter size (odd numbers) for kernel-based operations
- Intensity parameters (a, b) for enhancement operations

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/aliakrem/image-processing-playground-front-end.git
cd image-processing-playground-front-end
```

2. Install dependencies:
```bash
yarn install
```

3. Start the development server:
```bash
yarn start
```

The application will be available at `http://localhost:3000`

## Usage

1. Click the "Select Image" button or drag and drop an image into the upload area
2. Use the buttons on the left panel to apply different image processing operations
3. Adjust the parameters using the input fields when available
4. The processed image will be displayed in real-time

## Tech Stack

- React.js for the user interface
- TypeScript for type-safe code
- backend setup  [here](https://github.com/AliAkrem/image-processing-playground-back-end)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
