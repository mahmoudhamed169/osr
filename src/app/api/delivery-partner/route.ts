import { NextResponse } from "next/server";
import { transporter, MAIL_FROM, MAIL_TO } from "@/lib/mailer";

const FLEET_LABELS: Record<string, string> = {
  "1-5":   "1 – 5 مناديب",
  "6-20":  "6 – 20 منديب",
  "21-50": "21 – 50 منديب",
  "50+":   "أكثر من 50 منديب",
};

export async function POST(request: Request) {
  try {
    const { company, contactName, phone, email, cities, fleetSize, notes } =
      await request.json() as {
        company: string;
        contactName: string;
        phone: string;
        email?: string;
        cities?: string;
        fleetSize?: string;
        notes?: string;
      };

    if (!company?.trim() || !contactName?.trim() || !phone?.trim()) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const fleet = FLEET_LABELS[fleetSize ?? ""] ?? fleetSize ?? "—";

    await transporter.sendMail({
      from: MAIL_FROM,
      to: MAIL_TO,
      subject: `[OSR] شراكة توصيل — ${company}`,
      html: `
        <div dir="rtl" style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#FFFBF3;border-radius:12px;overflow:hidden;border:1px solid #eee;">
          <div style="background:#C8102E;padding:20px 28px;">
            <h1 style="color:#fff;margin:0;font-size:20px;font-weight:700;">طلب شراكة توصيل 🚴</h1>
            <p style="color:#fff;margin:6px 0 0;font-size:14px;opacity:.85;">شركة توصيل جديدة تريد الانضمام لـ OSR</p>
          </div>
          <div style="padding:28px;background:#fff;">
            <table style="width:100%;border-collapse:collapse;font-size:15px;">
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;font-weight:700;color:#1A1410;width:170px;">اسم الشركة</td>
                <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;color:#333;">${company}</td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;font-weight:700;color:#1A1410;">اسم المسؤول</td>
                <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;color:#333;">${contactName}</td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;font-weight:700;color:#1A1410;">رقم الجوال</td>
                <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;direction:ltr;text-align:right;">
                  <a href="tel:${phone}" style="color:#C8102E;text-decoration:none;">${phone}</a>
                </td>
              </tr>
              ${email ? `
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;font-weight:700;color:#1A1410;">البريد الإلكتروني</td>
                <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;">
                  <a href="mailto:${email}" style="color:#C8102E;text-decoration:none;">${email}</a>
                </td>
              </tr>` : ""}
              ${cities ? `
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;font-weight:700;color:#1A1410;">المدن التشغيلية</td>
                <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;color:#333;">${cities}</td>
              </tr>` : ""}
              <tr>
                <td style="padding:12px 0;border-bottom:${notes ? "1px solid #f0f0f0" : "none"};font-weight:700;color:#1A1410;">حجم الأسطول</td>
                <td style="padding:12px 0;border-bottom:${notes ? "1px solid #f0f0f0" : "none"};">
                  <span style="background:#C8102E;color:#fff;padding:3px 12px;border-radius:20px;font-size:13px;font-weight:600;">${fleet}</span>
                </td>
              </tr>
              ${notes ? `
              <tr>
                <td style="padding:12px 0;font-weight:700;color:#1A1410;vertical-align:top;">ملاحظات</td>
                <td style="padding:12px 0;color:#333;white-space:pre-wrap;line-height:1.7;">${notes}</td>
              </tr>` : ""}
            </table>
          </div>
          <div style="padding:16px 28px;background:#faf7f2;border-top:1px solid #eee;text-align:center;">
            <p style="margin:0;color:#999;font-size:12px;">تم الإرسال عبر موقع OSR — osr.sa</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[delivery-partner] email error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
