import { FormEvent, useEffect, useState } from "react";
import { AttendingInput } from "./AttendingInput";
import { useRsvpResponse } from "./hooks/useRsvpResponse";
import { useRsvpToken } from "./hooks/useRsvpToken";
import { useSubmitRsvp } from "./hooks/useSubmitRsvp";
import styles from "./Rsvp.module.css";

export const Rsvp = () => {
  const { token, setToken } = useRsvpToken();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [attending, setAttending] = useState<boolean>();
  const [additionalNotes, setAdditionalNotes] = useState("");

  const { isLoading, data } = useRsvpResponse(token);
  useEffect(() => {
    setName(data?.name ?? "");
    setAddress(data?.address ?? "");
    setAttending(data?.attending);
    setAdditionalNotes(data?.additionalNotes ?? "");
  }, [data?.additionalNotes, data?.address, data?.attending, data?.name]);

  const invalid = !name.trim().length || undefined === attending;
  const { submitRsvp, isSubmitting } = useSubmitRsvp();
  const submit = async (event: FormEvent) => {
    event.preventDefault();

    if (invalid) {
      return;
    }

    try {
      const response = await submitRsvp({
        token: data?.token,
        name,
        address,
        attending,
        additionalNotes,
      });

      setToken(response.token);
    } catch (error) {
      console.error(error);
    }
  };

  let buttonVerb = undefined === attending ? "Submit" : "Update";

  if (isSubmitting) {
    buttonVerb = undefined === attending ? "Submitting" : "Updating";
  }

  return (
    <form className={styles.root} onSubmit={submit}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          RSVP <span className={styles.subtitle}>by August 5</span>
        </h1>
        <div className={styles.field}>
          <label htmlFor="rsvp-name">Can you attend the baby shower?</label>
          <AttendingInput
            value={attending}
            onChange={setAttending}
            disabled={isLoading}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="rsvp-name">Your name</label>
          <input
            id="rsvp-name"
            type="text"
            disabled={isLoading || !!data}
            value={name}
            onChange={({ target }) => {
              setName(target.value);
            }}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="rsvp-address">
            Your address (for thank you cards)
          </label>
          <input
            id="rsvp-address"
            type="text"
            disabled={isLoading}
            value={address}
            onChange={({ target }) => {
              setAddress(target.value);
            }}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="rsvp-additional-notes">
            Additional notes or dietary restrictions
          </label>
          <textarea
            id="rsvp-additional-notes"
            disabled={isLoading}
            value={additionalNotes}
            onChange={({ target }) => {
              setAdditionalNotes(target.value);
            }}
          />
        </div>
      </div>

      <button
        className={styles.submitButton}
        type="submit"
        disabled={isLoading || invalid || isSubmitting}
      >
        {buttonVerb} RSVP
      </button>
    </form>
  );
};
