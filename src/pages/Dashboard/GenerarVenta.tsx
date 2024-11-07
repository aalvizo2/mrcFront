import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import logo from '../../assets/img/logo-black.png';



 // Contador para el número de la nota

const generarPDF = async (cliente: string, productos: any[], total: number, domicilio: string, numeroNota: string) => {
    
    

    // Crear un nuevo documento PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);
    const { width, height } = page.getSize();

    // Cargar el logo como imagen y redimensionarlo
    const logoBytes = await fetch(logo).then((res) => res.arrayBuffer());
    const logoImage = await pdfDoc.embedPng(logoBytes);
    const logoWidth = 100;
    const logoHeight = (logoImage.height * logoWidth) / logoImage.width;

    // Dibujar el logo en la parte superior de la página
    page.drawImage(logoImage, {
        x: 30, // Margen izquierdo
        y: height - 90, // Margen superior
        width: logoWidth,
        height: logoHeight,
    });

    // Agregar fuente estándar
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    
    // Encabezado con detalles de la nota
    page.drawRectangle({
        x: 30,
        y: height - 100,
        width: width - 60,
        height: 80,
        borderColor: rgb(0.9, 0.9, 0.9), // Gris claro de fondo
    });

    // Formatear el número de la nota para que tenga 7 dígitos
    
    page.drawText(`Nota de Venta N°: ${numeroNota}`, { x: 180, y: height - 60, size: 10, font, color: rgb(0, 0, 0) });
    page.drawText(`Cliente: ${cliente}`, { x: 180, y: height - 80, size: 10, font });
    page.drawText(`Domicilio: ${domicilio}`, { x: 400, y: height - 60, size: 10, font });

    // Línea de separación bajo el encabezado
    page.drawLine({
        start: { x: 30, y: height - 130 },
        end: { x: width - 30, y: height - 130 },
        thickness: 1,
        color: rgb(0.8, 0.8, 0.8),
    });

    page.drawText(`Producto`, {x: 40, size: 12, y: height -120, font, color: rgb(0, 0, 0)});
    page.drawText(`Precio`, {x: 160, size: 12, y: height -120, font, color: rgb(0, 0, 0)});
    page.drawText(`Cantidad`, {x: 260, size: 12, y: height -120, font, color: rgb(0, 0, 0)})
    
    // Posición inicial para la tabla
    let yPosition = height - 150;

    

    // Contenido de los productos
    productos.forEach((producto: any) => {
        const totalProducto = (producto.PublicPrice * producto.Amount).toFixed(2);
        page.drawText(`- ${producto.Name}`, { x: 40, y: yPosition, size: 10, font, color: rgb(0, 0, 0) });
        page.drawText(`$${producto.PublicPrice}`, { x: 160, y: yPosition, size: 10, font, color: rgb(0, 0, 0) });
        page.drawText(`${producto.quantity}`, { x: 280, y: yPosition, size: 10, font, color: rgb(0, 0, 0) });
        page.drawText(`$${totalProducto}`, { x: 380, y: yPosition, size: 10, font, color: rgb(0, 0, 0) });
        yPosition -= 20; // Decrementar la posición Y para el siguiente producto
    });

    // Total de la venta en negritas
    page.drawText(`Total de la Venta:  ${new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(total)}`, { x: 260, y: yPosition - 20, size: 12, font, color: rgb(0, 0, 0) });

    // Footer atractivo
    page.drawLine({
        start: { x: 30, y: 50 },
        end: { x: width - 30, y: 50 },
        thickness: 1,
        color: rgb(0.8, 0.8, 0.8),
    });
    page.drawText('Gracias por su compra!', { x: width / 2 - 70, y: 30, size: 10, font, color: rgb(0.3, 0.3, 0.3) });
    page.drawText(`Fecha: ${new Date().toLocaleDateString()}`, { x: 40, y: 30, size: 10, font, color: rgb(0.3, 0.3, 0.3) });

    // Guardar el PDF como un blob
    const pdfBytes = await pdfDoc.save();

    // Crear un enlace para descargar o abrir el PDF en una nueva pestaña
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');

    // Incrementar el contador de notas para la próxima venta
    
};

// Ejemplo de función para guardar reportes de ventas
const guardarReporte = (cliente: string, productos: any[], total: number, domicilio: string) => {
    const reportes = JSON.parse(localStorage.getItem('reportesVentas') || '[]');
    reportes.push({ cliente, productos, total, domicilio, fecha: new Date().toISOString() });
    localStorage.setItem('reportesVentas', JSON.stringify(reportes));
};



export default generarPDF;
export { guardarReporte };
