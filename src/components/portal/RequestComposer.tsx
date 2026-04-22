import { createAidRequestAction } from "@/app/dashboard/actions";
import { FormStatusButton } from "@/components/portal/FormStatusButton";
import { REQUEST_CATEGORY_OPTIONS } from "@/lib/portal/constants";

export function RequestComposer() {
  return (
    <section
      id="new-request"
      className="rounded-[32px] border border-[rgba(244,241,234,0.08)] bg-[rgba(10,14,24,0.78)] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.26)]"
    >
      <div className="max-w-3xl">
        <div className="text-[11px] uppercase tracking-[0.32em] text-[rgba(244,241,234,0.48)]">
          Legal Aid Intake
        </div>
        <h2 className="mt-3 font-display text-3xl uppercase tracking-[0.08em] text-[var(--warm-white)]">
          Submit a Request for Shield Review
        </h2>
        <p className="mt-3 text-sm leading-7 text-[rgba(244,241,234,0.68)]">
          Give the intake team a clear picture of the matter, include any supporting links,
          and attach the documents or images we should review first.
        </p>
      </div>

      <form action={createAidRequestAction} className="mt-8 grid gap-5 lg:grid-cols-2">
        <label className="space-y-2">
          <span className="text-[11px] uppercase tracking-[0.28em] text-[rgba(244,241,234,0.56)]">
            Category
          </span>
          <select
            name="category"
            required
            className="w-full rounded-[16px] border border-white/10 bg-[rgba(7,12,19,0.9)] px-4 py-3 text-sm text-[var(--warm-white)] outline-none focus:border-[rgba(194,163,93,0.4)]"
            defaultValue=""
          >
            <option value="" disabled>
              Select a category
            </option>
            {REQUEST_CATEGORY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-[11px] uppercase tracking-[0.28em] text-[rgba(244,241,234,0.56)]">
            Supporting Files
          </span>
          <input
            type="file"
            name="attachments"
            multiple
            accept=".pdf,.png,.jpg,.jpeg,.webp,.doc,.docx"
            className="block w-full rounded-[16px] border border-dashed border-white/12 bg-[rgba(7,12,19,0.9)] px-4 py-3 text-sm text-[rgba(244,241,234,0.72)] file:mr-4 file:rounded-full file:border-0 file:bg-[rgba(194,163,93,0.18)] file:px-4 file:py-2 file:text-xs file:uppercase file:tracking-[0.18em] file:text-[var(--warm-white)]"
          />
        </label>

        <label className="space-y-2 lg:col-span-2">
          <span className="text-[11px] uppercase tracking-[0.28em] text-[rgba(244,241,234,0.56)]">
            Detailed Description
          </span>
          <textarea
            name="description"
            required
            minLength={20}
            rows={7}
            className="w-full rounded-[20px] border border-white/10 bg-[rgba(7,12,19,0.9)] px-4 py-4 text-sm leading-7 text-[var(--warm-white)] outline-none focus:border-[rgba(194,163,93,0.4)]"
            placeholder="Describe the legal issue, what has happened so far, what deadlines exist, and what help you need."
          />
        </label>

        <label className="space-y-2 lg:col-span-2">
          <span className="text-[11px] uppercase tracking-[0.28em] text-[rgba(244,241,234,0.56)]">
            Supporting Links
          </span>
          <textarea
            name="supporting_links"
            rows={4}
            className="w-full rounded-[20px] border border-white/10 bg-[rgba(7,12,19,0.9)] px-4 py-4 text-sm leading-7 text-[var(--warm-white)] outline-none focus:border-[rgba(194,163,93,0.4)]"
            placeholder="Paste one URL per line for articles, screenshots, cloud folders, or related references."
          />
        </label>

        <div className="flex flex-col gap-3 lg:col-span-2 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-2xl text-sm leading-6 text-[rgba(244,241,234,0.58)]">
            Files are stored privately in Supabase Storage and linked only to this request.
          </p>
          <FormStatusButton pendingLabel="Submitting Request...">
            Submit Request
          </FormStatusButton>
        </div>
      </form>
    </section>
  );
}
