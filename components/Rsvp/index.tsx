import cn from "classnames";
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

  const { isFetching, rsvpResponse } = useRsvpResponse(token);
  useEffect(() => {
    setName(rsvpResponse?.name ?? "");
    setAddress(rsvpResponse?.address ?? "");
    setAttending(rsvpResponse?.attending);
    setAdditionalNotes(rsvpResponse?.additionalNotes ?? "");
  }, [
    rsvpResponse?.additionalNotes,
    rsvpResponse?.address,
    rsvpResponse?.attending,
    rsvpResponse?.name,
  ]);

  const invalid = !name.trim().length || undefined === attending;
  const { submitRsvp, isSubmitting } = useSubmitRsvp();
  const [error, setError] = useState(false);
  const submit = async (event: FormEvent) => {
    event.preventDefault();

    if (invalid) {
      return;
    }

    setError(false);

    try {
      const response = await submitRsvp({
        token: rsvpResponse?.token,
        name,
        address,
        attending,
        additionalNotes,
      });

      setToken(response.token);
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  const hasSubmitted = undefined !== rsvpResponse?.attending;

  return (
    <form className={styles.root} onSubmit={submit}>
      <h1 className={styles.title}>
        RSVP<span className={styles.subtitle}> by August 5</span>
      </h1>
      <div className={styles.field}>
        <label htmlFor="rsvp-name">Can you attend the baby shower?</label>
        <AttendingInput
          value={attending}
          onChange={setAttending}
          disabled={isFetching}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="rsvp-name">Your name</label>
        <input
          id="rsvp-name"
          type="text"
          required
          disabled={isFetching || !!rsvpResponse}
          value={name}
          onChange={({ target }) => {
            setName(target.value);
          }}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="rsvp-address">Your address (for thank you cards)</label>
        <input
          id="rsvp-address"
          type="text"
          disabled={isFetching}
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
          disabled={isFetching}
          value={additionalNotes}
          onChange={({ target }) => {
            setAdditionalNotes(target.value);
          }}
        />
      </div>
      <div className={styles.footer}>
        <button
          className={cn(styles.submitButton, {
            [styles.submitButtonLoading]: isSubmitting,
          })}
          type="submit"
          disabled={isFetching || invalid || isSubmitting}
        >
          {hasSubmitted ? "Update" : "Submit"} RSVP
        </button>
        {error ? (
          <div className={cn(styles.footerMessage, styles.footerMessageError)}>
            There was an error! Can you try again?
          </div>
        ) : (
          hasSubmitted && (
            <div className={styles.footerMessage}>
              {rsvpResponse.attending
                ? "We're looking forward to seeing you!"
                : "Thanks for letting us know!"}
            </div>
          )
        )}
      </div>
    </form>
  );
};
